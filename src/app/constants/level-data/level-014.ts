import { Direction } from '../direction.enum';
import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_14: Partial<Level> = {
  name: 'Twisted Confusion',
  settings: {
    goal: 50,
    food: {
      initialAmount: 30,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.fire]: 5
    }
  },
  obstacles: {
    walls: [
      { position: { x: 0, y: 26 }, direction: Direction.right, length: 23 },
      { position: { x: 0, y: 14 }, direction: Direction.right, length: 27 },
      { position: { x: 0, y: 9 }, direction: Direction.right, length: 26 },
      { position: { x: 0, y: 4 }, direction: Direction.right, length: 17 },
      { position: { x: 31, y: 19 }, direction: Direction.left, length: 25 },
      { position: { x: 17, y: 0 }, direction: Direction.up, length: 9 },
      { position: { x: 27, y: 0 }, direction: Direction.up, length: 19 },
      { position: { x: 5, y: 19 }, direction: Direction.up, length: 7 },
      { position: { x: 23, y: 20 }, direction: Direction.up, length: 11 },
    ]
  },
  portals: [
    { entrance: { x: 15, y: 2 }, exit: { x: 2, y: 24 } },
    { entrance: { x: 25, y: 16 }, exit: { x: 1, y: 6 } },
    { entrance: { x: 21, y: 21 }, exit: { x: 1, y: 2 } },
    { entrance: { x: 21, y: 24 }, exit: { x: 29, y: 1 } },
    { entrance: { x: 30, y: 17 }, exit: { x: 2, y: 29 } },
    { entrance: { x: 30, y: 21 }, exit: { x: 19, y: 2 } },
    { entrance: { x: 19, y: 7 }, exit: { x: 1, y: 11 } },
    { entrance: { x: 25, y: 2 }, exit: { x: 7, y: 24 } }
  ]
}