import { Component, input } from '@angular/core';
// Constants & Enums
import { EnemyType } from '../../../constants/blocks/level/enemy-type.enum';
// Interfaces & Types
import { Game } from '../../../types/game/game.interface';
import { Level } from '../../../types/level/level.interface';
import { Snake } from '../../../types/snake/snake.interface.ts';
// Pipes
import { SecondsAsTimePipe } from '../../../pipes/seconds-as-time.pipe';

@Component({
  selector: 'app-game-stats',
  imports: [SecondsAsTimePipe],
  templateUrl: './game-stats.component.html',
  styleUrl: './game-stats.component.scss',
})
export class GameStatsComponent {

  readonly EnemyType = EnemyType;

  game = input.required<Game>();
  level = input.required<Level>();
  snake = input.required<Snake>();

}
