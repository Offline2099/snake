import { Level } from '../../types/level';

export const LEVEL_4: Partial<Level> = {
  name: 'Food Heaven',
  settings: {
    goal: 200,
    food: {
      initialAmount: 100,
      spawnOnConsumption: 4
    }
  }
}