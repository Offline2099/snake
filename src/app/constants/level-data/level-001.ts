import { Level } from '../../types/level/level.interface';

export const LEVEL_1: Partial<Level> = {
  name: 'Baby Steps',
  instructions: [
    'Click the Start button to play.',
    'Use arrow keys or click the arrow buttons to turn the snake.',
    'Collect food to make progress.',
    'Don\'t hit the walls.'
  ],
  settings: {
    goal: 30,
    food: {
      initialAmount: 10,
      spawnOnConsumption: 1
    }
  }
}
