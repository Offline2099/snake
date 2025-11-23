import { Component, HostListener, input, output } from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Subscription, interval } from 'rxjs';
// Constants & Enums
import { Direction } from '../../constants/direction.enum';
import { LEVELS } from '../../constants/levels';
import { BLOCK_SIZE } from '../../constants/defaults';
import { BLOCK_CLASS } from '../../constants/blocks/level/block-class';
import { SNAKE_END_BLOCK_CLASS } from '../../constants/blocks/snake/snake-end-block-class';
import { SNAKE_BODY_BLOCK_CLASS } from '../../constants/blocks/snake/snake-body-block-class';
import { GameBlockType } from '../../constants/blocks/game-block-type.enum';
import { PortalType } from '../../constants/blocks/level/portal-type.enum';
// Interfaces & Types
import { Snake } from '../../types/snake/snake.interface.ts';
import { Level } from '../../types/level/level.interface';
import { Game } from '../../types/game/game.interface';
// Services
import { SnakeService } from '../../services/snake.service';
import { LevelService } from '../../services/level.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  imports: [NgClass, NgStyle, NgTemplateOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

  @HostListener('window:keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.timer) return;
    this.gameService.changeSnakeDirectionByKey(this.game, this.snake, event.key);
  }

  readonly BLOCK_SIZE = BLOCK_SIZE;
  readonly Direction = Direction;
  readonly GameBlockType = GameBlockType;
  readonly PortalType = PortalType;
  readonly BLOCK_CLASS = BLOCK_CLASS;
  readonly SNAKE_END_BLOCK_CLASS = SNAKE_END_BLOCK_CLASS;
  readonly SNAKE_BODY_BLOCK_CLASS = SNAKE_BODY_BLOCK_CLASS;

  levelId = input.required<number>();
  
  snake!: Snake;
  level!: Level;
  game!: Game;

  timer: Subscription | null = null;

  nextLevel = output<number>();
  menu = output<void>();

  constructor(
    private snakeService: SnakeService,
    private levelService: LevelService,
    private gameService: GameService
  ) {}

  ngOnChanges(): void {
    this.resetGame();
  }

  resetGame(): void {
    this.stopTimer();
    this.snake = this.snakeService.createSnake();
    this.level = this.levelService.createLevel(LEVELS[this.levelId()]);
    this.game = this.gameService.initialize(this.snake, this.level);
  }

  toggleTimer(): void {
    this.timer ? this.stopTimer() : this.startTimer();
  }

  startTimer(): void {
    if (this.timer) this.stopTimer();
    this.timer = interval(this.game.stepTime).subscribe(() => {
      this.processGameStep(this.game, this.snake, this.level);
    });
  }

  stopTimer(): void {
    if (!this.timer) return;
    this.timer.unsubscribe();
    this.timer = null;
  }

  processGameStep(game: Game, snake: Snake, level: Level): void {
    this.gameService.processStep(game, snake, level);
    if (this.game.isFail || this.game.isVictory) this.stopTimer();
  }

  changeDirection(direction: Direction): void {
    if (!this.timer) return;
    this.gameService.changeSnakeDirection(this.game, this.snake, direction);
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
