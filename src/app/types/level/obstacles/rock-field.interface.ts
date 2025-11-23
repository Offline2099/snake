import { Position } from '../../general/position.interface';

export interface RockField {
  position: Position;
  width: number;
  height: number;
  gap: number;
}
