import { Level } from '../../types/level/level.interface';

export const LEVEL_4: Partial<Level> = {
  name: 'Food Heaven',
  instructions: [
    'Feast like nobody is watching.',
    'Remember that the more you eat the bigger you get.'
  ],
  settings: {
    goal: 200,
    food: {
      initialAmount: 100,
      spawnOnConsumption: 4
    }
  }
}