import { LevelSettings } from './level-settings.interface';
import { LevelState } from './level-state.interface';
import { Constraints } from './constraints.interface';
import { LevelObstacles } from './obstacles/level-obstacles.interface';
import { Portal } from './portal.interface';
import { Enemy } from './enemy.interface';
import { SnakeFood } from './snake-food.interface';

export interface Level {
  name: string;
  instructions?: string[];
  settings: LevelSettings;
  state?: LevelState;
  constraints: Constraints;
  obstacles?: LevelObstacles;
  portals?: Portal[];
  enemies?: Enemy[];
  food: SnakeFood[];
}
