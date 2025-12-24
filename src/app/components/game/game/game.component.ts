import { Component, HostListener, input, output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
// Constants & Enums
import { Direction } from '../../../constants/direction.enum';
import { LEVELS } from '../../../constants/levels';
import { STORAGE_KEY } from '../../../constants/storage';
// Interfaces & Types
import { Snake } from '../../../types/snake/snake.interface.ts';
import { Level } from '../../../types/level/level.interface';
import { Game } from '../../../types/game/game.interface';
import { LevelState } from '../../../types/level/level-state.interface';
// Components
import { GameStatsComponent } from '../game-stats/game-stats.component';
import { GameProgressComponent } from '../game-progress/game-progress.component';
import { GameAreaComponent } from '../game-area/game-area.component';
import { GameControlsComponent } from '../game-controls/game-controls.component';
// Services
import { SnakeService } from '../../../services/snake.service';
import { LevelService } from '../../../services/level.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game',
  imports: [GameStatsComponent, GameProgressComponent, GameAreaComponent, GameControlsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

  @HostListener('window:keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();
    this.handleKeyboardEvent(event.key);
  }

  levelId = input.required<number>();
  
  snake!: Snake;
  level!: Level;
  game!: Game;

  timer: Subscription | null = null;

  menu = output<void>();

  constructor(
    private snakeService: SnakeService,
    private levelService: LevelService,
    private gameService: GameService
  ) {}

  ngOnChanges(): void {
    this.resetGame();
  }

  handleKeyboardEvent(key: string): void {
    if (key === ' ' && !this.timer) {
      this.startTimer();
      return;
    }
    if (this.timer) this.gameService.changeSnakeDirectionByKey(this.game, this.snake, key);
  }

  resetGame(): void {
    this.stopTimer();
    this.snake = this.snakeService.createSnake();
    this.level = this.levelService.createLevel(LEVELS[this.levelId()]);
    this.game = this.gameService.initialize(this.snake, this.level);
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
    if (this.game.isFail || this.game.isVictory) {
      this.stopTimer();
      this.updateLevelState(game, this.levelId());
    }
  }

  updateLevelState(game: Game, id: number): void {
    const data: LevelState[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);    
    if (game.isVictory) {
      data[id].isComplete = true;
      if (data[id].bestTime > game.elapsedTime || !data[id].bestTime) data[id].bestTime = game.elapsedTime;
      if (id !== LEVELS.length - 1) data[id + 1].isLocked = false;
      this.levelService.updateLevelState(id + 1, { ...data[id + 1] });
    }
    if (data[id].bestProgress < game.progress) data[id].bestProgress = game.progress;
    this.levelService.updateLevelState(id, { ...data[id] });
  }

  changeDirection(direction: Direction): void {
    if (!this.timer) return;
    this.gameService.changeSnakeDirection(this.game, this.snake, direction);
  }

  showMenu(): void {
    this.menu.emit();
  }

  ngOnDestroy(): void {
    if (this.timer) this.timer.unsubscribe();
  }

}
