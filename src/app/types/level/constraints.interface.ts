import { Obstacle } from './obstacles/obstacle.interface';

export interface Constraints {
  width: number;
  height: number;
  obstacles: Obstacle[];
}