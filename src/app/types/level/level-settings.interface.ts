import { EnemyType } from '../../constants/blocks/level/enemy-type.enum';

export interface LevelSettings {
  goal: number;
  stepTime?: number;
  food: {
    initialAmount: number;
    spawnOnConsumption: number;
  },
  enemies?: Partial<Record<EnemyType, number>>;
}
