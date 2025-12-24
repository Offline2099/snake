import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Game } from '../../../types/game/game.interface';
import { Level } from '../../../types/level/level.interface';

@Component({
  selector: 'app-game-progress',
  imports: [NgStyle],
  templateUrl: './game-progress.component.html',
  styleUrl: './game-progress.component.scss',
})
export class GameProgressComponent {

  game = input.required<Game>();
  level = input.required<Level>();

}
