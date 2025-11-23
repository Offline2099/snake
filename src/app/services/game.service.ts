import { Injectable } from '@angular/core';
// Constants & Enums
import { Direction } from '../constants/direction.enum';
import { DEFAULT_STEP_TIME, ENEMY_VICINITY, PORTAL_VICINITY, SNAKE_VICINITY } from '../constants/defaults';
import { GameBlockType } from '../constants/blocks/game-block-type.enum';
import { ProtectedBlockType } from '../constants/blocks/level/protected-block-type.enum';
import { PortalType } from '../constants/blocks/level/portal-type.enum';
import { FoodType } from '../constants/blocks/level/food-type.enum';
import { EnemyType } from '../constants/blocks/level/enemy-type.enum';
import { FOOD_VALUE } from '../constants/food-value';
import { DAMAGE } from '../constants/enemy-damage';
// Interfaces & Types
import { Position } from '../types/general/position.interface';
import { Snake } from '../types/snake/snake.interface.ts';
import { Level } from '../types/level/level.interface';
import { Game } from '../types/game/game.interface';
import { GameBlockData } from '../types/game/game-block-data.interface';
import { BodyBlock } from '../types/snake/body-block.interface';
import { Portal } from '../types/level/portal.interface';
// Services
import { UtilityService } from './utility.service';
import { SnakeService } from './snake.service';
import { SpaceService } from './space.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private utility: UtilityService,
    private snakeService: SnakeService,
    private spaceService: SpaceService
  ) {}

  //===========================================================================
  //  Game Construction
  //===========================================================================

  initialize(snake: Snake, level: Level): Game {
    const game: Game = {
      space: this.spaceService.createSpace(level),
      isFail: false,
      isVictory: false,
      progress: 0,
      percentage: 0,
      stepTime: level.settings.stepTime || DEFAULT_STEP_TIME,
      stepsDone: 0,
      elapsedTime: 0,
      activePortals: [],
      foodTotal: level.food.length,
      foodConsumed: 0,
      piles: 0,
      fires: 0,
      pilesHit: 0,
      firesHit: 0,
      damageTaken: 0,
      fireDamageTaken: 0,
      natureDamageTaken: 0
    }
    this.setObstacles(game.space, level);
    this.setPortals(game.space, level);
    this.setSnake(game.space, snake);
    this.setInitialEnemies(game, level);
    this.setInitialFood(game, level);
    return game;
  }

  private setObstacles(space: GameBlockData[][], level: Level): void {
    level.constraints.obstacles.forEach(block => {
      this.spaceService.setBlock(space, block.position, { type: GameBlockType.obstacle, subType: block.type });
    });
  }

  private setPortals(space: GameBlockData[][], level: Level): void {
    if (!level.portals) return;
    level.portals.forEach(portal => {
      const data: GameBlockData = {
        type: GameBlockType.portal,
        subType: PortalType.entrance,
        portalTo: portal.exit
      }
      this.spaceService.setBlock(space, portal.entrance, data);
      this.spaceService.protectNeighborhood(space, portal.entrance, PORTAL_VICINITY, ProtectedBlockType.portal);
      this.spaceService.protectNeighborhood(space, portal.exit, PORTAL_VICINITY, ProtectedBlockType.portal);
    });
  }

  private setInitialEnemies(game: Game, level: Level): void {
    if (!level.enemies) return;
    level.enemies.forEach(block => {
      this.spaceService.setBlock(game.space, block.position, { type: GameBlockType.enemy, subType: block.type });
      this.spaceService.protectNeighborhood(game.space, block.position, ENEMY_VICINITY, ProtectedBlockType.enemy);
    });
    if (!level.settings.enemies) return;
    Object.entries(level.settings.enemies).forEach(([type, amount]) => {
      this.spawnEnemies(game, Number(type), amount);
    });
  }

  private setInitialFood(game: Game, level: Level): void {
    level.food.forEach(block => 
      this.spaceService.setBlock(game.space, block.position, { type: GameBlockType.food })
    );
    this.spawnFood(game, FoodType.normal, level.settings.food.initialAmount);
  }

  //===========================================================================
  //  Game Step Processing
  //===========================================================================

  processStep(game: Game, snake: Snake, level: Level): void {
    if (game.progress >= level.settings.goal) {
      game.isVictory = true;
      return;
    }
    game.stepsDone++;
    game.elapsedTime = Math.floor(game.stepTime * game.stepsDone / 1000);
    const positionAhead: Position = 
      this.utility.shiftPosition(snake.head.currentPosition, snake.direction);
    this.processCollisionDetection(game, positionAhead);
    this.processPortalInteraction(game, positionAhead);
    this.processFoodInteraction(game, snake, level, positionAhead);
    this.processEnemyInteraction(game, snake, level, positionAhead);
    if (game.isFail || game.isVictory) return;
    this.moveSnake(game.space, snake);
    if (game.activePortals.length) this.processActivePortalList(game, snake);
  }

  private processCollisionDetection(game: Game, position: Position): void {
    if (this.spaceService.isCollisionAhead(game, position)) game.isFail = true;
  }

  private processPortalInteraction(game: Game, position: Position): void {
    const portalTo: Position | null = this.spaceService.portalAhead(game, position);
    if (portalTo === null) return;
    game.activePortals.push({
      entrance: { ...position },
      exit: { ...portalTo }
    });
  }

  private processActivePortalList(game: Game, snake: Snake): void {
    const portal: Portal | undefined = game.activePortals.find(portal => 
      this.utility.isSamePosition(portal.entrance, snake.head.currentPosition)
    );
    if (portal) {
      snake.head.previousPosition = portal.entrance;
      snake.head.currentPosition = portal.exit;
    }
    game.activePortals.forEach(portal => this.snakeService.adjustForPortal(snake, portal));
    game.activePortals = game.activePortals.filter(portal => 
      !this.utility.isSamePosition(portal.exit, snake.tail.currentPosition)
    );
  }

  private updateProgress(game: Game, level: Level, increment: number): void {
    game.progress += increment;
    game.percentage = Math.floor(100 * game.progress / level.settings.goal);
  }

  //===========================================================================
  //  Food
  //===========================================================================

  private spawnFood(game: Game, type: FoodType, amount: number): void {
    const available: Position[] = this.spaceService.availableSpace(game.space);
    [...Array(Math.min(available.length, amount))].map(_ => {
      const index: number = this.utility.randomInteger(0, available.length - 1);
      this.spaceService.setBlock(game.space, available[index], { type: GameBlockType.food, subType: type });
      available.splice(index, 1);
      game.foodTotal++;
    });
  }

  private processFoodInteraction(game: Game, snake: Snake, level: Level, position: Position): void {
    const food: FoodType | null = this.spaceService.foodAhead(game, position);
    if (food === null) return;
    game.foodTotal--;
    game.foodConsumed++;
    this.spawnFood(game, food, level.settings.food.spawnOnConsumption);
    this.snakeService.growSnake(snake);
    this.updateProgress(game, level, FOOD_VALUE[food]);
  }

  //===========================================================================
  //  Enemies
  //===========================================================================

  private spawnEnemies(game: Game, type: EnemyType, amount: number): void {
    [...Array(amount)].map(_ => {
      const available: Position[] = this.spaceService.availableSpace(game.space, false);
      if (available.length) {
        const position: Position = this.utility.randomFromArray(available);
        this.spaceService.setBlock(game.space, position, { type: GameBlockType.enemy, subType: type });
        this.spaceService.protectNeighborhood(game.space, position, ENEMY_VICINITY, ProtectedBlockType.enemy);
        if (type === EnemyType.pile) game.piles++;
        else if (type === EnemyType.fire) game.fires++;
      }
    });
  }

  private processEnemyInteraction(game: Game, snake: Snake, level: Level, position: Position): void {
    const enemy: EnemyType | null = this.spaceService.enemyAhead(game, position);
    if (enemy === null) return;
    this.calculateHitStats(game, enemy);
    if (DAMAGE[enemy] > snake.body.length - 1) {
      this.snakeService.takeDamage(snake, snake.body.length - 1);
      game.isFail = true;
      return;
    }
    this.reduceSnake(game.space, snake,  DAMAGE[enemy]);
    this.updateProgress(game, level, -DAMAGE[enemy]);
  }

  private calculateHitStats(game: Game, type: EnemyType): void {
    switch (type) {
      case EnemyType.pile:
        game.piles--;
        game.pilesHit++;
        game.natureDamageTaken += DAMAGE[type];
        break;
      case EnemyType.fire:
        game.fires--;
        game.firesHit++;
        game.fireDamageTaken += DAMAGE[type];
        break;
    }
    game.damageTaken += DAMAGE[type];
  }

  //===========================================================================
  //  Snake
  //===========================================================================

  changeSnakeDirection(game: Game, snake: Snake, direction: Direction): void {
    if (snake.head.currentDirection === this.utility.oppositeDirection(direction)) return;
    const nextHeadPosition: Position = 
      this.utility.shiftPosition(snake.head.currentPosition, direction);
    if (this.spaceService.isCollisionAhead(game, nextHeadPosition)) return;
    snake.direction = direction;
  }

  changeSnakeDirectionByKey(game: Game, snake: Snake, key: string): void {
    switch (key) {
      case 'ArrowUp':
        this.changeSnakeDirection(game, snake, Direction.up)
        break;
      case 'ArrowDown':
        this.changeSnakeDirection(game, snake, Direction.down)
        break;
      case 'ArrowLeft':
        this.changeSnakeDirection(game, snake, Direction.left)
        break;
      case 'ArrowRight':
        this.changeSnakeDirection(game, snake, Direction.right)
        break;
    }
  }

  private setSnake(space: GameBlockData[][], snake: Snake): void {
    [snake.head, ...snake.body, snake.tail].forEach(block => {
      if (this.spaceService.isOfType(space, block.currentPosition, GameBlockType.portal)) return;
      const data: GameBlockData = { type: GameBlockType.snake, subType: (block as BodyBlock).type };
      this.spaceService.setBlock(space, block.currentPosition, data);
      this.spaceService.protectNeighborhood(space, block.currentPosition, SNAKE_VICINITY, ProtectedBlockType.snake);
    });
    this.spaceService.protectLine(space, this.snakeService.snakeTrajectory(snake), ProtectedBlockType.snake);
  }

  private moveSnake(space: GameBlockData[][], snake: Snake): void {
    this.spaceService.setBlock(space, snake.tail.currentPosition, { type: GameBlockType.free });
    [snake.head, ...snake.body, snake.tail].forEach(block => 
      this.spaceService.unprotectNeighborhood(space, block.currentPosition, SNAKE_VICINITY, ProtectedBlockType.snake)
    );
    this.spaceService.unprotectLine(space, this.snakeService.snakeTrajectory(snake), ProtectedBlockType.snake);
    this.snakeService.updateSnake(snake);
    this.setSnake(space, snake);
  }

  private reduceSnake(space: GameBlockData[][], snake: Snake, amount: number): void {
    [snake.tail, ...snake.body].forEach(block => {
      this.spaceService.setBlock(space, block.currentPosition, { type: GameBlockType.free });
      this.spaceService.unprotectNeighborhood(space, block.currentPosition, SNAKE_VICINITY, ProtectedBlockType.snake);
    });
    this.snakeService.takeDamage(snake, amount);
    this.setSnake(space, snake);
  }

}