import { EnemyType, Level } from '../../types/level';
import { Direction } from '../direction.enum';

export const LEVEL_13: Partial<Level> = {
  name: 'Tricky Corners',
  settings: {
    goal: 30,
    food: {
      initialAmount: 28,
      spawnOnConsumption: 0
    },
    enemies: {
      [EnemyType.pile]: 10,
      [EnemyType.fire]: 10
    }
  },
  obstacles: {
    walls: [
      { position: { x: 0, y: 25 }, direction: Direction.right, length: 7 },
      { position: { x: 31, y: 25 }, direction: Direction.left, length: 7 },
      { position: { x: 7, y: 26 }, direction: Direction.up, length: 6 },
      { position: { x: 24, y: 26 }, direction: Direction.up, length: 6 },
    ],
    rockFields: [
      { position: { x: 8, y: 23 }, width: 18, height: 18, gap: 2 }
    ]
  },
  portals: [
    { entrance: { x: 5, y: 30 }, exit: { x: 14, y: 5 } },
    { entrance: { x: 26, y: 30 }, exit: { x: 17, y: 5 } },
    { entrance: { x: 29, y: 22 }, exit: { x: 1, y: 27 } },
    { entrance: { x: 2, y: 22 }, exit: { x: 30, y: 27 } }
  ],
  food: [
    { id: '4-28', position: { x: 4, y: 28 } },
    { id: '29-29', position: { x: 29, y: 29 } }
  ]
}