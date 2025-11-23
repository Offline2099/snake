import { Direction } from '../direction.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_5: Partial<Level> = {
  name: 'Broken Loop',
  settings: {
    goal: 50,
    food: {
      initialAmount: 25,
      spawnOnConsumption: 1
    }
  },
  obstacles: {
    walls: [
      { position: { x: 3, y: 3 }, direction: Direction.right, length: 26 },
      { position: { x: 28, y: 7 }, direction: Direction.up, length: 22 },
      { position: { x: 24, y: 28 }, direction: Direction.left, length: 22 },
      { position: { x: 3, y: 24 }, direction: Direction.down, length: 18 },
      { position: { x: 7, y: 7 }, direction: Direction.right, length: 18 },
      { position: { x: 24, y: 11 }, direction: Direction.up, length: 14 },
      { position: { x: 20, y: 24 }, direction: Direction.left, length: 14 },
      { position: { x: 7, y: 20 }, direction: Direction.down, length: 10 },
      { position: { x: 11, y: 11 }, direction: Direction.right, length: 10 },
      { position: { x: 20, y: 15 }, direction: Direction.up, length: 6 },
      { position: { x: 16, y: 20 }, direction: Direction.left, length: 6 },
      { position: { x: 11, y: 16 }, direction: Direction.down, length: 2 },
      { position: { x: 15, y: 15 }, direction: Direction.right, length: 2 }
    ]
  }
}