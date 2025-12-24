import { Direction } from './direction.enum';
import { LevelState } from '../types/level/level-state.interface';
import { Constraints } from '../types/level/constraints.interface';
import { SnakeOptions } from '../types/snake/snake-options.interface';

export const BLOCK_SIZE: number = 16;

export const DEFAULT_STEP_TIME: number = 150;

export const DEFAULT_CONSTRAINTS: Constraints = {
  width: 32,
  height: 32,
  obstacles: []
}

export const DEFAULT_LEVEL_STATE: LevelState = {
  isLocked: true,
  isComplete: false,
  bestProgress: 0,
  bestTime: 0
}

export const DEFAULT_SNAKE: SnakeOptions = {
  headPosition: {
    x: 2,
    y: 0
  },
  direction: Direction.right,
  length: 3
}

export const PORTAL_VICINITY: number = 1;
export const ENEMY_VICINITY: number = 1;
export const SNAKE_VICINITY: number = 1;
export const SNAKE_TRAJECTORY: number = 10;