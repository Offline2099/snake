import { Direction } from '../direction.enum';
import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_15: Partial<Level> = {
  name: 'The Catacombs',
  settings: {
    goal: 50,
    food: {
      initialAmount: 30,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 15,
      [EnemyType.fire]: 10
    }
  },
  obstacles: {
    rocks: [
      { x: 9, y: 10 },
      { x: 9, y: 13 },
      { x: 13, y: 10 },
    ],
    walls: [
      { position: { x: 3, y: 3 }, direction: Direction.right, length: 27 },
      { position: { x: 31, y: 6 }, direction: Direction.left, length: 4 },
      { position: { x: 25, y: 4 }, direction: Direction.up, length: 3 },
      { position: { x: 28, y: 7 }, direction: Direction.up, length: 23 },
      { position: { x: 25, y: 7 }, direction: Direction.left, length: 5 },
      { position: { x: 27, y: 10 }, direction: Direction.left, length: 4 },
      { position: { x: 21, y: 8 }, direction: Direction.up, length: 3 },
      { position: { x: 24, y: 11 }, direction: Direction.up, length: 19 },
      { position: { x: 23, y: 13 }, direction: Direction.left, length: 4 },
      { position: { x: 23, y: 13 }, direction: Direction.left, length: 4 },
      { position: { x: 20, y: 10 }, direction: Direction.left, length: 4 },
      { position: { x: 17, y: 11 }, direction: Direction.up, length: 3 },
      { position: { x: 20, y: 14 }, direction: Direction.up, length: 3 },
      { position: { x: 19, y: 16 }, direction: Direction.left, length: 4 },
      { position: { x: 16, y: 13 }, direction: Direction.left, length: 4 },
      { position: { x: 13, y: 14 }, direction: Direction.up, length: 3 },
      { position: { x: 16, y: 17 }, direction: Direction.up, length: 13 },
      { position: { x: 15, y: 19 }, direction: Direction.left, length: 4 },
      { position: { x: 12, y: 16 }, direction: Direction.left, length: 4 },
      { position: { x: 9, y: 17 }, direction: Direction.up, length: 3 },
      { position: { x: 12, y: 20 }, direction: Direction.up, length: 3 },
      { position: { x: 11, y: 22 }, direction: Direction.left, length: 4 },
      { position: { x: 8, y: 19 }, direction: Direction.left, length: 7 },
      { position: { x: 5, y: 20 }, direction: Direction.up, length: 3 },
      { position: { x: 8, y: 23 }, direction: Direction.up, length: 7 },
      { position: { x: 7, y: 25 }, direction: Direction.left, length: 6 },
      { position: { x: 2, y: 22 }, direction: Direction.left, length: 3 },
      { position: { x: 3, y: 4 }, direction: Direction.up, length: 3 },
      { position: { x: 0, y: 7 }, direction: Direction.right, length: 4 },
      { position: { x: 0, y: 16 }, direction: Direction.right, length: 7 },
      { position: { x: 6, y: 7 }, direction: Direction.right, length: 13 },
      { position: { x: 2, y: 10 }, direction: Direction.right, length: 4 },
      { position: { x: 6, y: 8 }, direction: Direction.up, length: 8 },
      { position: { x: 2, y: 26 }, direction: Direction.up, length: 4 },
      { position: { x: 5, y: 28 }, direction: Direction.up, length: 4 },
      { position: { x: 12, y: 31 }, direction: Direction.down, length: 7 },
      { position: { x: 20, y: 31 }, direction: Direction.down, length: 13 },
    ]
  },
  portals: [
    { entrance: { x: 30, y: 8 }, exit: { x: 1, y: 5 } },
    { entrance: { x: 23, y: 5 }, exit: { x: 14, y: 21 } },
    { entrance: { x: 3, y: 13 }, exit: { x: 26, y: 12 } }
  ]
}