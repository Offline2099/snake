import { Position } from '../../general/position.interface';
import { Line } from '../../general/line.interface';
import { RockField } from './rock-field.interface';

export interface LevelObstacles {
  rocks?: Position[];
  walls?: Line[];
  rockFields?: RockField[];
}