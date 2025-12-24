import { Component, input } from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
// Constants & Enums
import { GameBlockType } from '../../../constants/blocks/game-block-type.enum';
import { PortalType } from '../../../constants/blocks/level/portal-type.enum';
import { BLOCK_SIZE } from '../../../constants/defaults';
import { BLOCK_CLASS } from '../../../constants/blocks/level/block-class';
import { SNAKE_END_BLOCK_CLASS } from '../../../constants/blocks/snake/snake-end-block-class';
import { SNAKE_BODY_BLOCK_CLASS } from '../../../constants/blocks/snake/snake-body-block-class';
// Interfaces
import { Game } from '../../../types/game/game.interface';
import { Level } from '../../../types/level/level.interface';
import { Snake } from '../../../types/snake/snake.interface.ts';

@Component({
  selector: 'app-game-area',
  imports: [NgClass, NgStyle, NgTemplateOutlet],
  templateUrl: './game-area.component.html',
  styleUrl: './game-area.component.scss',
})
export class GameAreaComponent {

  readonly GameBlockType = GameBlockType;
  readonly PortalType = PortalType;
  readonly BLOCK_SIZE = BLOCK_SIZE;
  readonly BLOCK_CLASS = BLOCK_CLASS;
  readonly SNAKE_END_BLOCK_CLASS = SNAKE_END_BLOCK_CLASS;
  readonly SNAKE_BODY_BLOCK_CLASS = SNAKE_BODY_BLOCK_CLASS;

  game = input.required<Game>();
  level = input.required<Level>();
  snake = input.required<Snake>();

}
