import { Direction } from '../../constants/direction.enum';
import { SnakeBlock } from './snake-block.interface';

export interface HeadBlock extends SnakeBlock {
  currentDirection: Direction;
}