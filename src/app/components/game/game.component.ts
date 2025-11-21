import { Component, HostListener, input, output } from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { Snake, SnakeBodyBlockType } from '../../types/snake';
import { SnakeService } from '../../services/snake.service';
import { Direction } from '../../constants/direction.enum';
import { LevelService } from '../../services/level.service';
import { Level, SnakeFood, ObstacleType, Portal, EnemyType, Enemy } from '../../types/level';
import { LEVELS } from '../../constants/levels';
import { DEFAULT_STEP_TIME } from '../../constants/defaults';
import { DAMAGE } from '../../constants/enemy-damage';

const BLOCK_SIZE: number = 16;

@Component({
  selector: 'app-game',
  imports: [NgClass, NgStyle, NgTemplateOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

  @HostListener('window:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.timer) return;
    this.snakeService.changeSnakeDirectionByKey(this.snake, this.level, event.key);
  }

  readonly BLOCK_SIZE = BLOCK_SIZE;
  readonly Direction = Direction;
  readonly BlockType = SnakeBodyBlockType;
  readonly ObstacleType = ObstacleType;
  readonly EnemyType = EnemyType;

  levelId = input.required<number>();
  
  snake!: Snake;
  level!: Level;

  stepTime!: number;
  
  isFail!: boolean;
  isVictory!: boolean;
  progress: number = 0;
  percentage: number = 0;

  timer: Subscription | null = null;

  activePortals: Portal[] = [];

  stepsDone: number = 0;
  timeElapsed: number = 0;
  foodConsumed: number = 0;
  pilesHit: number = 0;
  firesHit: number = 0;
  damageTaken: number = 0;
  fireDamageTaken: number = 0;
  natureDamageTaken: number = 0;
  piles: number = 0;
  fires: number = 0;

  nextLevel = output<number>();
  menu = output<void>();

  constructor(private snakeService: SnakeService, private levelService: LevelService) {}

  ngOnChanges(): void {
    this.resetGame();
  }

  resetGame(): void {
    this.stopTimer();
    this.isFail = false;
    this.isVictory = false;
    this.progress = 0;
    this.percentage = 0;
    this.snake = this.snakeService.createSnake();
    this.level = this.levelService.createLevel(this.snake, LEVELS[this.levelId()]);
    this.stepTime = this.level.settings.stepTime || DEFAULT_STEP_TIME;

    this.stepsDone = 0;
    this.timeElapsed = 0;
    this.foodConsumed = 0;
    this.pilesHit = 0;
    this.firesHit = 0;
    this.damageTaken = 0;
    this.fireDamageTaken = 0;
    this.natureDamageTaken = 0;
    this.piles = this.level.settings.enemies ? this.level.settings.enemies[EnemyType.pile] || 0 : 0;
    this.fires = this.level.settings.enemies ? this.level.settings.enemies[EnemyType.fire] || 0 : 0;
  }

  toggleTimer(): void {
    this.timer ? this.stopTimer() : this.startTimer();
  }

  startTimer(): void {
    if (this.timer) this.stopTimer();
    this.timer = interval(this.stepTime).subscribe(() => 
      this.processGameStep(this.snake, this.level)
    );
  }

  stopTimer(): void {
    if (!this.timer) return;
    this.timer.unsubscribe();
    this.timer = null;
  }

  processGameStep(snake: Snake, level: Level): void {
    this.stepsDone++;
    this.timeElapsed = Math.floor(this.stepTime * this.stepsDone / 1000);
    if (this.snakeService.isCollisionDetected(snake, level)) {
      this.isFail = true;
      this.stopTimer();
      return;
    }
    this.snakeService.updateSnake(this.snake);
    this.processPortalsInteraction(snake, level, this.activePortals);
    this.processFoodInteraction(snake, level);
    this.processEnemyInteraction(snake, level);
    if (this.progress === this.level.settings.goal) {
      this.isVictory = true;
      this.stopTimer();
    }
  }

  processPortalsInteraction(snake: Snake, level: Level, activePortals: Portal[]): void {
    if (!level.portals) return;
    const portal: Portal | null = this.levelService.portalEntered(snake, level);
    if (portal) {
      snake.head.currentPosition = portal.exit;
      activePortals.push(portal);
    }
    if (activePortals.length) {
      const exited: Portal | null = this.levelService.portalExited(snake, level);
      if (exited) activePortals.splice(activePortals.indexOf(exited), 1);
      activePortals.forEach(portal => this.snakeService.adjustForPortal(snake, portal));
    }
  }

  processFoodInteraction(snake: Snake, level: Level): void {
    const foodFound: SnakeFood | null = this.levelService.foodFound(snake, level);
    if (!foodFound) return;
    this.snakeService.growSnake(snake);
    this.levelService.updateFoodState(snake, level, foodFound);
    this.foodConsumed++;
    this.updateProgress(1);
  }

  processEnemyInteraction(snake: Snake, level: Level): void {
    const enemyFound: Enemy | null = this.levelService.enemyFound(snake, level);
    if (!enemyFound) return;
    if (DAMAGE[enemyFound.type] >= snake.body.length - 1) {
      this.snakeService.takeDamage(snake, snake.body.length - 2);
      this.isFail = true;
      this.stopTimer();
    }
    else {
      this.snakeService.takeDamage(snake, DAMAGE[enemyFound.type]);
      this.levelService.updateEnemyState(level, enemyFound);
      this.updateProgress(-DAMAGE[enemyFound.type]);
    }
    if (enemyFound.type === EnemyType.pile) {
      this.pilesHit++;
      this.piles--;
      this.natureDamageTaken += DAMAGE[enemyFound.type];
    }
    if (enemyFound.type === EnemyType.fire) {
      this.firesHit++;
      this.fires--;
      this.fireDamageTaken += DAMAGE[enemyFound.type];
    }
    this.damageTaken += DAMAGE[enemyFound.type];
  }
  
  updateProgress(increment: number): void {
    this.progress += increment;
    this.percentage = Math.floor(100 * this.progress / this.level.settings.goal);
  }

  changeDirection(direction: Direction): void {
    if (!this.timer) return;
    this.snakeService.changeSnakeDirection(this.snake, this.level, direction);
  }

  startNextLevel(): void {
    this.nextLevel.emit(this.levelId() + 1);
  }

  showMenu(): void {
    this.menu.emit();
  }

  ngOnDestroy(): void {
    if (this.timer) this.timer.unsubscribe();
  }

}
