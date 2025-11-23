import { SnakeBodyBlockType } from './snake-body-block-type-enum';

export const SNAKE_BODY_BLOCK_CLASS: Record<SnakeBodyBlockType, string> = {
  [SnakeBodyBlockType.horizontal]: 'horizontal',
  [SnakeBodyBlockType.vertical]: 'vertical',
  [SnakeBodyBlockType.betweenTopAndLeft]: 'round-bottom-right',
  [SnakeBodyBlockType.betweenTopAndRight]: 'round-bottom-left',
  [SnakeBodyBlockType.betweenBottomAndLeft]: 'round-top-right',
  [SnakeBodyBlockType.betweenBottomAndRight]: 'round-top-left'
}
