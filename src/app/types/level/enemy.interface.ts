import { EnemyType } from '../../constants/blocks/level/enemy-type.enum';
import { Position } from '../general/position.interface';

export interface Enemy {
  type: EnemyType;
  position: Position;
}
