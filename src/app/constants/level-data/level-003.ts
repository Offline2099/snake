import { EnemyType, Level } from '../../types/level';
import { Direction } from '../direction.enum';

export const LEVEL_3: Partial<Level> = {
  name: 'Ancient Ruins',
  settings: {
    goal: 30,
    food: {
      initialAmount: 10,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 5
    }
  },
  obstacles: {
    rocks: [
      { x: 21, y: 12 },
      { x: 10, y: 15 },
      { x: 11, y: 9 }
    ],
    walls: [
      { position: { x: 4, y: 4 }, direction: Direction.right, length: 15 },
      { position: { x: 2, y: 22 }, direction: Direction.right, length: 23 },
      { position: { x: 6, y: 27 }, direction: Direction.right, length: 23 },
      { position: { x: 6, y: 8 }, direction: Direction.up, length: 12 },
      { position: { x: 16, y: 7 }, direction: Direction.up, length: 12 },
      { position: { x: 26, y: 3 }, direction: Direction.up, length: 15 },
    ]
  }
}