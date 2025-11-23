import { Portal } from '../level/portal.interface';
import { GameBlockData } from './game-block-data.interface';

export interface Game {
  space: GameBlockData[][];
  isFail: boolean;
  isVictory: boolean;
  progress: number;
  percentage: number;
  stepTime: number;
  stepsDone: number;
  elapsedTime: number;
  activePortals: Portal[];
  foodTotal: number;
  foodConsumed: number;
  piles: number;
  fires: number;
  pilesHit: number;
  firesHit: number;
  damageTaken: number;
  fireDamageTaken: number;
  natureDamageTaken: number;
}