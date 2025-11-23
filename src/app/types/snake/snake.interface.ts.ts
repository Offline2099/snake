import { Direction } from '../../constants/direction.enum';
import { TailBlock } from './tail-block.interface';
import { BodyBlock } from './body-block.interface';
import { HeadBlock } from './head-block.interface';

export interface Snake {
  direction: Direction;
  head: HeadBlock;
  body: BodyBlock[];
  tail: TailBlock;
}