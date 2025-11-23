import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_2: Partial<Level> = {
  name: 'First Time Outside',
  settings: {
    goal: 40,
    food: {
      initialAmount: 1,
      spawnOnConsumption: 2
    },
    enemies: {
      [EnemyType.pile]: 5
    }
  },
  obstacles: {
    rocks: [
      { x: 10, y: 10 },
      { x: 6, y: 23 },
      { x: 12, y: 16 },
      { x: 14, y: 28 },
      { x: 15, y: 7 },
      { x: 22, y: 17 },
      { x: 25, y: 21 },
      { x: 24, y: 4 },
      { x: 16, y: 22 },
      { x: 24, y: 26 },
      { x: 6, y: 5 }
    ]
  }
}