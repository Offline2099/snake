import { Direction } from '../../direction.enum';

export const SNAKE_END_BLOCK_CLASS: Record<Direction, string> = {
  [Direction.up]: 'up',
  [Direction.down]: 'down',
  [Direction.left]: 'left',
  [Direction.right]: 'right' 
}