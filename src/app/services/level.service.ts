import { Injectable } from '@angular/core';
import { Snake } from '../types/snake';
import { UtilityService } from './utility.service';
import { Level, SnakeFood, ObstacleType, LevelObstacles, Wall, Portal, RockField, EnemyType, Enemy, Constraints } from '../types/level';
import { Position } from '../types/position.interface';
import { DEFAULT_CONSTRAINTS } from '../constants/defaults';
import { Direction } from '../constants/direction.enum';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private utility: UtilityService) {}

  //===========================================================================
  //  Level Construction
  //===========================================================================

  createLevel(snake: Snake, data: Partial<Level>): Level {
    console.log('create level')
    const level: Level = {
      name: data.name || '',
      settings: this.utility.deepCopy(data.settings!),
      constraints: data.constraints
        ? this.utility.deepCopy(data.constraints) 
        : this.utility.deepCopy(DEFAULT_CONSTRAINTS),
      portals: data.portals ? this.utility.deepCopy(data.portals) : undefined,
      enemies: data.enemies ? this.utility.deepCopy(data.enemies) : [],
      food: data.food ? this.utility.deepCopy(data.food) : []      
    };
    this.setObstacles(level, data.obstacles);
    this.spawnEnemies(snake, level, data.settings?.enemies);
    this.spawnFood(snake, level, level.settings.food.initialAmount);
    return level;
  }

  private setObstacles(level: Level, obstacles?: LevelObstacles): void {
    if (!obstacles) return;
    if (obstacles.rocks) {
      obstacles.rocks.forEach(rock => this.addRock(level, rock));
    }
    if (obstacles.walls) {
      obstacles.walls.forEach(wall => this.addWall(level, wall));
    }
    if (obstacles.rockFields) {
      obstacles.rockFields.forEach(field => this.addRockField(level, field));
    }
  }

  private addRock(level: Level, position: Position): void {
    if (!this.isInsideGrid(level, position)) return;
    level.constraints.obstacles.push({ type: ObstacleType.rock, position });
  }

  private addWall(level: Level, wall: Wall): void {
    const isHorizontal: boolean = [Direction.left, Direction.right].includes(wall.direction);
    const [toRight, toLeft, toTop, toBottom]: boolean[] = [
      wall.direction === Direction.right, wall.direction === Direction.left,
      wall.direction === Direction.up, wall.direction === Direction.down,
    ];
    for (let i = 0; i < wall.length; i++) {
      const position: Position = this.utility.shiftPosition(wall.position, wall.direction, i);
      if (!this.isInsideGrid(level, position)) break;
      const type: ObstacleType = isHorizontal
        ? (toRight && !i) || (toLeft && i === wall.length - 1)
          ? ObstacleType.wallEndLeft
          : (toLeft && !i) || (toRight && i === wall.length - 1)
            ? ObstacleType.wallEndRight
            : ObstacleType.wallHorizontal
        : (toBottom && !i) || (toTop && i === wall.length - 1)
          ? ObstacleType.wallEndTop
          : (toTop && !i) || (toBottom && i === wall.length - 1)
            ? ObstacleType.wallEndBottom
            : ObstacleType.wallVertical;
      level.constraints.obstacles.push({ type, position });
    }
  }

  private addRockField(level: Level, field: RockField): void {
    if (field.width < 1 || field.height < 1) return;
    for (let x = 0; x < field.width; x += field.gap + 1) {
      for (let y = 0; y < field.height; y += field.gap + 1) {
        if (this.isInsideGrid(level, { x, y }))
          this.addRock(level, { x: field.position.x + x, y: field.position.y - y });
      }
    }
  }

  private spawnEnemies(snake: Snake, level: Level, enemies?: Partial<Record<EnemyType, number>>): void {
    if (!enemies) return;
    Object.entries(enemies).forEach(([type, amount]) => 
      this.spawnEnemyType(snake, level, Number(type), Number(amount))
    );
  }

  private spawnEnemyType(snake: Snake, level: Level, type: EnemyType, amount: number = 1): void {
    if (!level.enemies) level.enemies = [];
    const available: Position[] = this.availableSpace(snake, level, true);
    const enemies: Position[] = []
    let enemyCount: number = 0;
    while (enemyCount < amount) {
      if (!available.length) break;
      const index: number = this.utility.randomInteger(0, available.length - 1);
      if (
        enemies.some(enemy => 
          this.utility.neighborhood(available[index], 1)
            .some(position => this.utility.isSamePosition(position, enemy))
        )
      ) continue;  
      enemyCount++;
      level.enemies.push({
        id: `${available[index].x}-${available[index].y}`,
        type,
        position: { ...available[index] }
      });
      enemies.push({ ...available[index] });
      available.splice(index, 1);      
    }
  }

  private spawnFood(snake: Snake, level: Level, amount: number = 1): void {
    const available: Position[] = this.availableSpace(snake, level, false);
    let foodCount: number = 0;
    while (foodCount < amount) {
      if (!available.length) break;
      const index: number = this.utility.randomInteger(0, available.length - 1);      
      foodCount++;
      level.food.push({
        id: `${available[index].x}-${available[index].y}`,
        position: { ...available[index] }
      });
      available.splice(index, 1);
    }
  }

  //===========================================================================
  //  Level Utility
  //===========================================================================

  private occupiedByObstacles(level: Level): Position[] {
    return level.constraints.obstacles.map(obstacle => obstacle.position);
  }

  private occupiedBySnake(snake: Snake, useMargin: boolean): Position[] {
    const space: Position[] = 
      [snake.head, ...snake.body, snake.tail].map(block => 
        this.utility.neighborhood(block.currentPosition, useMargin ? 1 : 0)
      ).flat();
    if (useMargin) {
      const direction: Direction = snake.head.currentDirection;
      for (let distance = 1; distance <= 10; distance++) {
        space.push(this.utility.shiftPosition(snake.head.currentPosition, direction, distance));
      }
    }
    return space;
  }

  private occupiedByPortals(level: Level, margin: number = 0): Position[] {
    if (!level.portals) return [];
    return level.portals.map(portal => [
      ...this.utility.neighborhood(portal.entrance, margin),
      ...this.utility.neighborhood(portal.exit, margin),
    ]).flat();
  }

  private occupiedByEnemies(level: Level, margin: number): Position[] {
    return level.enemies.map(enemy => this.utility.neighborhood(enemy.position, margin)).flat();
  }

  private availableSpace(snake: Snake, level: Level, useMargins: boolean): Position[] {
    const available: Position[] = [];
    const occupied = [
      ...this.occupiedBySnake(snake, useMargins).filter(position => this.isInsideGrid(level, position)),
      ...this.occupiedByObstacles(level),
      ...this.occupiedByPortals(level, useMargins ? 2 : 0),
      ...this.occupiedByEnemies(level, useMargins ? 1 : 0)
    ];
    for (let x = level.constraints.xmin; x <= level.constraints.xmax; x++) {
      for (let y = level.constraints.xmin; y <= level.constraints.xmax; y++) {
        const position: Position = { x, y };
        if (!occupied.find(spot => this.utility.isSamePosition(position, spot)))
          available.push({ ...position });
      }
    }
    return available;
  }

  private isInsideGrid(level: Level, position: Position): boolean {
    return position.x >= level.constraints.xmin && position.x <= level.constraints.xmax
      && position.y >= level.constraints.ymin && position.y <= level.constraints.ymax;
  }

  //===========================================================================
  //  Level Update
  //===========================================================================

  foodFound(snake: Snake, level: Level): SnakeFood | null {
    for (let food of level.food) {
      if (this.utility.isSamePosition(snake.head.currentPosition, food.position))
        return food;
    }
    return null;
  }

  updateFoodState(snake: Snake, Level: Level, foodFound: SnakeFood): void {
    Level.food.splice(Level.food.indexOf(foodFound), 1);
    this.spawnFood(snake, Level, Level.settings.food.spawnOnConsumption);
  }

  enemyFound(snake: Snake, level: Level): Enemy | null {
    if (!level.enemies) return null;
    for (let enemy of level.enemies) {
      if (this.utility.isSamePosition(snake.head.currentPosition, enemy.position))
        return enemy;
    }
    return null;
  }

  updateEnemyState(Level: Level, enemyFound: Enemy): void {
    Level.enemies!.splice(Level.enemies!.indexOf(enemyFound), 1);
  }

  portalEntered(snake: Snake, Level: Level): Portal | null {
    if (!Level.portals) return null;
    for (let portal of Level.portals) {
      if (this.utility.isSamePosition(snake.head.currentPosition, portal.entrance))
        return portal;
    }
    return null;
  }

  portalExited(snake: Snake, Level: Level): Portal | null {
    if (!Level.portals) return null;
    for (let portal of Level.portals) {
      if (this.utility.isSamePosition(snake.tail.currentPosition, portal.exit))
        return portal;
    }
    return null;
  }

}