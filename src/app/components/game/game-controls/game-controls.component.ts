import { Component, input, output } from '@angular/core';
import { Direction } from '../../../constants/direction.enum';
import { Game } from '../../../types/game/game.interface';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {

  readonly Direction = Direction;

  game = input.required<Game>();

  start = output<void>();
  pause = output<void>();
  reset = output<void>();
  toMenu = output<void>();

  directionChange = output<Direction>();

  startGame(): void {
    this.start.emit();
  }

  pauseGame(): void {
    this.pause.emit();
  }

  resetGame(): void {
    this.reset.emit();
  }

  showMenu(): void {
    this.toMenu.emit();
  }

  changeDirection(direction: Direction): void {
    this.directionChange.emit(direction);
  }

}
