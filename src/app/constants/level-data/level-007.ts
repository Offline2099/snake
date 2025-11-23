import { Direction } from '../direction.enum';
import { EnemyType } from '../blocks/level/enemy-type.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_7: Partial<Level> = {
  name: 'The Temple',
  settings: {
    goal: 50,
    food: {
      initialAmount: 20,
      spawnOnConsumption: 1
    },
    enemies: {
      [EnemyType.pile]: 5
    }
  },
  obstacles: {
    rocks: [
      { x: 12, y: 12 },
      { x: 12, y: 20 },
      { x: 13, y: 13 },
      { x: 13, y: 19 },
      { x: 14, y: 14 },
      { x: 14, y: 18 },
      { x: 17, y: 14 },
      { x: 17, y: 18 },
      { x: 18, y: 13 },
      { x: 18, y: 19 },
      { x: 19, y: 12 },
      { x: 19, y: 20 },
      { x: 1, y: 16 },
      { x: 30, y: 16 },
      { x: 12, y: 1 },
      { x: 12, y: 30 },
      { x: 19, y: 1 },
      { x: 19, y: 30 },
    ],
    walls: [
      { position: { x: 3, y: 16 }, direction: Direction.right, length: 10 },
      { position: { x: 15, y: 16 }, direction: Direction.right, length: 2 },
      { position: { x: 19, y: 16 }, direction: Direction.right, length: 10 },
      { position: { x: 15, y: 21 }, direction: Direction.right, length: 2 },
      { position: { x: 15, y: 11 }, direction: Direction.right, length: 2 },
      { position: { x: 12, y: 10 }, direction: Direction.down, length: 8 },
      { position: { x: 19, y: 10 }, direction: Direction.down, length: 8 },
      { position: { x: 12, y: 22 }, direction: Direction.up, length: 7 },
      { position: { x: 19, y: 22 }, direction: Direction.up, length: 7 },
      { position: { x: 0, y: 21 }, direction: Direction.right, length: 10 },
      { position: { x: 0, y: 11 }, direction: Direction.right, length: 10 },
      { position: { x: 22, y: 21 }, direction: Direction.right, length: 10 },
      { position: { x: 22, y: 11 }, direction: Direction.right, length: 10 },
    ]
  }
}