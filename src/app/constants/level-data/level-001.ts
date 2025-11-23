import { Level } from '../../types/level/level.interface';

export const LEVEL_1: Partial<Level> = {
  name: 'Baby Steps',
  settings: {
    goal: 30,
    food: {
      initialAmount: 10,
      spawnOnConsumption: 1
    }
  }
}
