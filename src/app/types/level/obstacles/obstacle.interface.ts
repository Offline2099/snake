import { Position } from '../../general/position.interface';
import { ObstacleType } from '../../../constants/blocks/level/obstacle-type.enum';

export interface Obstacle {
  type: ObstacleType;
  position: Position;
}