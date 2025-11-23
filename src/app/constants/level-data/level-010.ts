import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_10: Partial<Level> = {
  name: 'This is Fine',
  settings: {
    goal: 40,
    food: {
      initialAmount: 20,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.fire]: 60
    }
  }
}