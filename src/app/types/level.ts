import { Direction } from '../constants/direction.enum';
import { Position } from './position.interface';

export enum ObstacleType {
  rock,
  wallHorizontal,
  wallVertical,
  wallEndTop,
  wallEndBottom,
  wallEndLeft,
  wallEndRight
}

export interface Obstacle {
  type: ObstacleType;
  position: Position;
}

export interface Constraints {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  obstacles: Obstacle[];
}

export interface SnakeFood {
  id: string;
  position: Position;
}

export interface LevelSettings {
  goal: number;
  stepTime?: number;
  food: {
    initialAmount: number;
    spawnOnConsumption: number;
  },
  enemies?: Partial<Record<EnemyType, number>>;
}

export interface Wall {
  position: Position;
  direction: Direction;
  length: number;
}

export interface RockField {
  position: Position;
  width: number;
  height: number;
  gap: number;
}

export interface LevelObstacles {
  rocks?: Position[];
  walls?: Wall[];
  rockFields?: RockField[];
}

export interface Portal {
  entrance: Position;
  exit: Position;
}

export enum EnemyType {
  pile,
  fire
}

export interface Enemy {
  id: string;
  type: EnemyType;
  position: Position;
}

export interface Level {
  name: string;
  settings: LevelSettings;
  constraints: Constraints;
  obstacles?: LevelObstacles;
  portals?: Portal[];
  food: SnakeFood[];
  enemies: Enemy[];
}
