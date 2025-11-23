import { Level } from '../../types/level/level.interface';

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