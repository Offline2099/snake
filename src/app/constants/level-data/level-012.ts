import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_12: Partial<Level> = {
  name: 'Order and Chaos',
  settings: {
    goal: 30,
    food: {
      initialAmount: 30,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 15,
      [EnemyType.fire]: 5
    }
  },
  obstacles: {
    rockFields: [
      { position: { x: 2, y: 29 }, width: 14, height: 14, gap: 1 },
      { position: { x: 17, y: 30 }, width: 14, height: 14, gap: 1 },
      { position: { x: 1, y: 14 }, width: 14, height: 14, gap: 1 },
      { position: { x: 18, y: 13 }, width: 14, height: 14, gap: 1 },
    ]
  },
  portals: [
    { entrance: { x: 18, y: 16 }, exit: { x: 4, y: 5 } },
    { entrance: { x: 21, y: 15 }, exit: { x: 26, y: 25 } },
    { entrance: { x: 24, y: 16 }, exit: { x: 27, y: 4 } },
    { entrance: { x: 27, y: 15 }, exit: { x: 5, y: 26 } }
  ]
}