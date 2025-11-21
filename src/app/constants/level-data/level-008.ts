import { Level } from '../../types/level';
import { Direction } from '../direction.enum';

export const LEVEL_8: Partial<Level> = {
  name: 'Portal Time',
  settings: {
    goal: 40,
    food: {
      initialAmount: 40,
      spawnOnConsumption: 0
    }
  },
  obstacles: {
    walls: [
      { position: { x: 0, y: 16 }, direction: Direction.right, length: 32 },
      { position: { x: 16, y: 0 }, direction: Direction.up, length: 13 },
      { position: { x: 17, y: 12 }, direction: Direction.right, length: 12 },
      { position: { x: 28, y: 11 }, direction: Direction.down, length: 9 },
      { position: { x: 27, y: 3 }, direction: Direction.left, length: 8 },
      { position: { x: 16, y: 31 }, direction: Direction.down, length: 12 },
      { position: { x: 15, y: 20 }, direction: Direction.left, length: 13 },
      { position: { x: 3, y: 21 }, direction: Direction.up, length: 8 },
      { position: { x: 4, y: 28 }, direction: Direction.right, length: 8 },
    ]
  },
  portals: [
    { entrance: { x: 22, y: 7 }, exit: { x: 25, y: 24 } },
    { entrance: { x: 8, y: 24 }, exit: { x: 7, y: 7 } }
  ]
}