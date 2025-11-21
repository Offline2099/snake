import { EnemyType, Level } from '../../types/level';

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