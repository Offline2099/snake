import { Injectable } from '@angular/core';
// Constants & Enums
import { Direction } from '../constants/direction.enum';
import { SnakeBodyBlockType } from '../constants/blocks/snake/snake-body-block-type-enum';
import { DEFAULT_SNAKE, SNAKE_TRAJECTORY } from '../constants/defaults';
// Interfaces & Types
import { Position } from '../types/general/position.interface';
import { Line } from '../types/general/line.interface';
import { SnakeOptions } from '../types/snake/snake-options.interface';
import { Snake } from '../types/snake/snake.interface.ts';
import { SnakeBlock } from '../types/snake/snake-block.interface';
import { HeadBlock } from '../types/snake/head-block.interface';
import { BodyBlock } from '../types/snake/body-block.interface';
import { TailBlock } from '../types/snake/tail-block.interface';
import { Portal } from '../types/level/portal.interface';
// Services
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  constructor(private utility: UtilityService) {}

  //===========================================================================
  //  Snake Construction
  //===========================================================================

  createSnake(snakeOptions?: Partial<SnakeOptions>): Snake {
    const options: SnakeOptions = { ...this.utility.deepCopy(DEFAULT_SNAKE), ...snakeOptions };
    const oppositeDirection: Direction = this.utility.oppositeDirection(options.direction);
    const tailPosition: Position =
      this.utility.shiftPosition(options.headPosition, oppositeDirection, options.length - 1);
    return {
      direction: options.direction,
      head: this.createHeadBlock(options.headPosition, options.direction),
      body: [...Array(options.length - 2).keys()].map(index => {
        const position: Position = 
          this.utility.shiftPosition(options.headPosition, oppositeDirection, index + 1);
        return this.createBodyBlock(position, options.direction, oppositeDirection);
      }),
      tail: this.createTailBlock(tailPosition, options.direction)
    }
  }

  private createSnakeBlock(position: Position): SnakeBlock {
    return {
      currentPosition: { ...position },
      previousPosition: { ...position }
    }
  }

  private createHeadBlock(position: Position, direction: Direction): HeadBlock {
    return {
      ...this.createSnakeBlock(position),
      currentDirection: direction
    }
  }

  private createBodyBlock(position: Position, toPrevious: Direction, toNext: Direction): BodyBlock {
    return {
      ...this.createSnakeBlock(position),
      type: this.bodyBlockType(toPrevious, toNext)
    }
  }

  private createTailBlock(position: Position, direction: Direction): TailBlock {
    return {
      ...this.createSnakeBlock(position),
      currentDirection: direction,
      previousDirection: direction
    }
  }

  //===========================================================================
  //  Snake Utility
  //===========================================================================

  snakeTrajectory(snake: Snake): Line {
    return {
      position: snake.head.currentPosition,
      direction: snake.head.currentDirection,
      length: SNAKE_TRAJECTORY
    }
  }

  private bodyBlockType(toPrevious: Direction, toNext: Direction): SnakeBodyBlockType {
    const adjacent: Direction[] = [toPrevious, toNext];
    const includesBoth = (a: Direction, b: Direction) => {
      return adjacent.includes(a) && adjacent.includes(b);
    }
    if (includesBoth(Direction.left, Direction.right)) return SnakeBodyBlockType.horizontal;
    if (includesBoth(Direction.up, Direction.down)) return SnakeBodyBlockType.vertical;
    if (includesBoth(Direction.up, Direction.left)) return SnakeBodyBlockType.betweenTopAndLeft;
    if (includesBoth(Direction.up, Direction.right)) return SnakeBodyBlockType.betweenTopAndRight;
    if (includesBoth(Direction.down, Direction.left)) return SnakeBodyBlockType.betweenBottomAndLeft;
    return SnakeBodyBlockType.betweenBottomAndRight;
  }

  private previousBlock(snake: Snake, bodyBlockIndex: number): SnakeBlock {
    return bodyBlockIndex ? snake.body[bodyBlockIndex - 1] : snake.head;
  }

  private nextBlock(snake: Snake, bodyBlockIndex: number): SnakeBlock {
    return bodyBlockIndex !== snake.body.length - 1 
      ? snake.body[bodyBlockIndex + 1] 
      : snake.tail;
  }

  //===========================================================================
  //  Snake Update
  //===========================================================================

  updateSnake(snake: Snake): void {
    this.updateHeadBlock(snake);
    this.updateBodyBlockPositions(snake);
    this.updateTailBlock(snake);
    this.updateBodyBlockTypes(snake);
  }

  growSnake(snake: Snake): void {
    const newBodyBlock: BodyBlock =
      this.createBodyBlock(
        snake.tail.currentPosition,
        snake.tail.currentDirection,
        this.utility.getDirection(snake.tail.currentPosition, snake.tail.previousPosition)
      );
    snake.body.push(newBodyBlock);
    snake.tail = this.createTailBlock(snake.tail.previousPosition, snake.tail.previousDirection);
  }

  takeDamage(snake: Snake, amount: number): void {
    if (amount > snake.body.length - 1) return;
    snake.body.splice(snake.body.length - amount);
    this.updateTailBlock(snake);
  }

  adjustForPortal(snake: Snake, portal: Portal): void {
    snake.body.forEach((block, index) => {
      if (!this.utility.isSamePosition(portal.exit, block.currentPosition)) return;
      const previous: SnakeBlock = this.previousBlock(snake, index);
      const next: SnakeBlock = this.nextBlock(snake, index);
      block.type = this.bodyBlockType(
        this.utility.getDirection(block.currentPosition, previous.currentPosition),
        this.utility.getDirection(portal.entrance, next.currentPosition)
      );
      if (index === snake.body.length - 1) {
        snake.tail.currentDirection = 
          this.utility.getDirection(snake.tail.currentPosition, portal.entrance);
      }
      else {
        const afterNext = this.nextBlock(snake, index + 1);
        (next as BodyBlock).type = this.bodyBlockType(
          this.utility.getDirection(next.currentPosition, portal.entrance),
          this.utility.getDirection(next.currentPosition, afterNext.currentPosition)
        );
      }
    });
  }

  private updateHeadBlock(snake: Snake): void {
    snake.head.previousPosition = { ...snake.head.currentPosition };
    snake.head.currentPosition = 
      this.utility.shiftPosition(snake.head.currentPosition, snake.direction);
    snake.head.currentDirection = snake.direction;
  }

  private updateBodyBlockPositions(snake: Snake): void {
    snake.body.forEach((block, index) => {
      const previous: SnakeBlock = this.previousBlock(snake, index);
      block.previousPosition = { ...block.currentPosition };
      block.currentPosition = { ...previous.previousPosition }; 
    });
  }

  private updateBodyBlockTypes(snake: Snake): void {
    snake.body.forEach((block, index) => {
      const previous: SnakeBlock = this.previousBlock(snake, index);
      const next: SnakeBlock = this.nextBlock(snake, index);
      block.type = this.bodyBlockType(
        this.utility.getDirection(block.currentPosition, previous.currentPosition),
        this.utility.getDirection(block.currentPosition, next.currentPosition)
      );
    });
  }

  private updateTailBlock(snake: Snake): void {
    const lastBodyBlock: SnakeBlock = snake.body[snake.body.length - 1];
    snake.tail.previousPosition = { ...snake.tail.currentPosition };
    snake.tail.previousDirection = snake.tail.currentDirection;
    snake.tail.currentPosition = { ...lastBodyBlock.previousPosition };
    snake.tail.currentDirection = 
      this.utility.getDirection(snake.tail.currentPosition, lastBodyBlock.currentPosition);
  }

}