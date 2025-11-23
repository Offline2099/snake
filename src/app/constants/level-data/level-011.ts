import { Direction } from '../direction.enum';
import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_11: Partial<Level> = {
  name: 'A Long Trip',
  settings: {
    goal: 80,
    food: {
      initialAmount: 70,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 50
    }
  },
  obstacles: {
    walls: [
      { position: { x: 8, y: 8 }, direction: Direction.right, length: 15 },
      { position: { x: 8, y: 9 }, direction: Direction.up, length: 15 },
      { position: { x: 9, y: 23 }, direction: Direction.right, length: 15 },
      { position: { x: 23, y: 22 }, direction: Direction.down, length: 15 },
      { position: { x: 31, y: 8 }, direction: Direction.left, length: 8 },
      { position: { x: 0, y: 23 }, direction: Direction.right, length: 8 }
    ]
  },
  portals: [
    { entrance: { x: 28, y: 3 }, exit: { x: 19, y: 19 } },
    { entrance: { x: 12, y: 19 }, exit: { x: 3, y: 28 } },
    { entrance: { x: 28, y: 12 }, exit: { x: 3, y: 19 } }
  ]
}