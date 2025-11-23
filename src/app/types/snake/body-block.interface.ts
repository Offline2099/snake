import { SnakeBodyBlockType } from '../../constants/blocks/snake/snake-body-block-type-enum';
import { SnakeBlock } from './snake-block.interface';

export interface BodyBlock extends SnakeBlock {
  type: SnakeBodyBlockType;
}