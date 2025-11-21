import { Direction } from '../constants/direction.enum';
import { Position } from './position.interface';

export interface SnakeBlock {
  currentPosition: Position;
  previousPosition: Position;
}

export interface HeadBlock extends SnakeBlock {
  currentDirection: Direction;
}

export enum SnakeBodyBlockType {
  horizontal,
  vertical,
  betweenTopAndLeft,
  betweenTopAndRight,
  betweenBottomAndLeft,
  betweenBottomAndRight
}

export interface BodyBlock extends SnakeBlock {
  type: SnakeBodyBlockType;
}

export interface TailBlock extends SnakeBlock {
  currentDirection: Direction;
  previousDirection: Direction;
}

export interface Snake {
  direction: Direction;
  head: HeadBlock;
  body: BodyBlock[];
  tail: TailBlock;
}

export interface SnakeOptions {
  headPosition: Position;
  direction: Direction;
  length: number;
}
