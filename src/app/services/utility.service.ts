import { Injectable } from '@angular/core';
import { Direction } from '../constants/direction.enum';
import { Position } from '../types/position.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Generates a random integer between `min` and `max`, including both. */
  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Returns a random element from the given array. */
  randomFromArray<T>(array: T[]): T {
    return array[this.randomInteger(0, array.length - 1)];
  }

  /** Returns true if the two given positions are the same, false otherwise. */
  isSamePosition(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
  }
  
  /**
   * Returns the position, shifted by a given amount of blocks, in the specified 
   * direction, relative to the initial position. The default amount is 1.
   */
  shiftPosition(initial: Position, direction: Direction, amount: number = 1): Position {
    const newPosition: Position = { ...initial };
    switch (direction) {
      case Direction.up:
        newPosition.y += amount;
        break;
      case Direction.down:
        newPosition.y -= amount;
        break;
      case Direction.left:
        newPosition.x -= amount;
        break;
      case Direction.right:
        newPosition.x += amount;
        break;
    }
    return newPosition;
  }

  neighborhood(position: Position, margin: number): Position[] {
    const neighborhood: Position[] = [];
    for (let x = position.x - margin; x <= position.x + margin; x++) {
      for (let y = position.y - margin; y <= position.y + margin; y++) {
        neighborhood.push({ x, y });
      }
    }
    return neighborhood;
  }

  /** Returns the direction opposite to the specified one. */
  oppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.up:
        return Direction.down;
      case Direction.down:
        return Direction.up;
      case Direction.left:
        return Direction.right;
      case Direction.right:
        return Direction.left;
    }
  }

  /**
   * Returns the direction of movement for given start and end positions, 
   * assuming that only horizontal or vertical movement is possible, and 
   * that the start and end positions can only be adjacent to each other.
   */
  getDirection(start: Position, end: Position): Direction {
    if (start.y < end.y) return Direction.up;
    if (start.y > end.y) return Direction.down;
    if (start.x > end.x) return Direction.left;
    return Direction.right;
  }

}