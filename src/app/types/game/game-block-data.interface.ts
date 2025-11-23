
import { GameBlockType } from '../../constants/blocks/game-block-type.enum';
import { GameBlockSubType } from './game-block-sub-type.type';
import { Position } from '../general/position.interface';

export interface GameBlockData {
  type: GameBlockType;
  subType?: GameBlockSubType;
  portalTo?: Position;
}