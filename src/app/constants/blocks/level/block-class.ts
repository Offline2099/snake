import { EnemyType } from './enemy-type.enum';
import { GameBlockType } from '../game-block-type.enum';
import { ObstacleType } from './obstacle-type.enum';
import { PortalType } from './portal-type.enum';

export const BLOCK_CLASS: Record<number, Record<number, string>> = {
  [GameBlockType.obstacle]: {
    [ObstacleType.rock]: 'rock',
    [ObstacleType.wallHorizontal]: 'wall horizontal',
    [ObstacleType.wallVertical]: 'wall vertical',
    [ObstacleType.wallEndTop]: 'wall end-top',
    [ObstacleType.wallEndBottom]: 'wall end-bottom',
    [ObstacleType.wallEndLeft]: 'wall end-left',
    [ObstacleType.wallEndRight]: 'wall end-right'
  },
  [GameBlockType.portal]: {
    [PortalType.entrance]: 'portal-entrance',
    [PortalType.exit]: 'portal-exit'
  },
  [GameBlockType.enemy]: {
    [EnemyType.pile]: 'pile',
    [EnemyType.fire]: 'fire'
  },
  [GameBlockType.food]: 'food'
}