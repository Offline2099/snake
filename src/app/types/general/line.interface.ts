import { Direction } from '../../constants/direction.enum';
import { Position } from './position.interface';

export interface Line {
  position: Position;
  direction: Direction;
  length: number;
}