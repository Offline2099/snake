import { Direction } from '../direction.enum';
import { Level } from '../../types/level/level.interface';

export const LEVEL_9: Partial<Level> = {
  name: 'Four Chambers',
  instructions: [
    'Collect all available food.',
    'Use the portals wisely.'
  ],
  settings: {
    goal: 40,
    food: {
      initialAmount: 40,
      spawnOnConsumption: 0
    }
  },
  obstacles: {
    walls: [
      { position: { x: 0, y: 16 }, direction: Direction.right, length: 16 },
      { position: { x: 16, y: 15 }, direction: Direction.right, length: 16 },
      { position: { x: 15, y: 15 }, direction: Direction.down, length: 16 },
      { position: { x: 16, y: 16 }, direction: Direction.up, length: 16 },
    ]
  },
  portals: [
    { entrance: { x: 11, y: 12 }, exit: { x: 20, y: 19 } },
    { entrance: { x: 28, y: 28 }, exit: { x: 28, y: 3 } },
    { entrance: { x: 19, y: 11 }, exit: { x: 12, y: 20 } },
  ]
}