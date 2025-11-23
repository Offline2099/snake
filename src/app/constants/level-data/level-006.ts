import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_6: Partial<Level> = {
  name: 'Scattered Mess',
  instructions: [
    'Navigate the dangerous environment while collecting food.',
    'Always avoid rocks. They are as deadly as walls.',
    'Fires cause 5 fire damage.',
    'Piles cause 2 nature damage.'
  ],
  settings: {
    goal: 40,
    food: {
      initialAmount: 20,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 15,
      [EnemyType.fire]: 5
    }
  },
  obstacles: {
    rocks: [
      { x: 4, y: 27 },
      { x: 4, y: 22 },
      { x: 9, y: 26 },
      { x: 12, y: 30 },
      { x: 1, y: 13 },
      { x: 5, y: 17 },
      { x: 9, y: 21 },
      { x: 13, y: 25 },
      { x: 17, y: 29 },
      { x: 2, y: 8 },
      { x: 6, y: 12 },
      { x: 10, y: 16 },
      { x: 14, y: 20 },
      { x: 18, y: 24 },
      { x: 22, y: 28 },
      { x: 3, y: 3 },
      { x: 7, y: 7 },
      { x: 11, y: 11 },
      { x: 15, y: 15 },
      { x: 19, y: 19 },
      { x: 23, y: 23 },
      { x: 27, y: 27 },
      { x: 8, y: 2 },
      { x: 12, y: 6 },
      { x: 16, y: 10 },
      { x: 20, y: 14 },
      { x: 24, y: 18 },
      { x: 28, y: 22 },
      { x: 13, y: 1 },
      { x: 17, y: 5 },
      { x: 22, y: 9 },
      { x: 25, y: 13 },
      { x: 29, y: 17 },
      { x: 22, y: 4 },
      { x: 26, y: 8 },
      { x: 30, y: 12 },
      { x: 27, y: 3 },
    ]
  }
}