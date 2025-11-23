import { Direction } from '../../constants/direction.enum';
import { Position } from '../general/position.interface';

export interface SnakeOptions {
  headPosition: Position;
  direction: Direction;
  length: number;
}
