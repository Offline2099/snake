import { Injectable } from '@angular/core';
// Constants & Enums
import { Direction } from '../constants/direction.enum';
import { DEFAULT_CONSTRAINTS } from '../constants/defaults';
import { ObstacleType } from '../constants/blocks/level/obstacle-type.enum.js';
// Interfaces & Types
import { Position } from '../types/general/position.interface';
import { Line } from '../types/general/line.interface.js';
import { Level } from '../types/level/level.interface.js';
import { LevelObstacles } from '../types/level/obstacles/level-obstacles.interface.js';
import { RockField } from '../types/level/obstacles/rock-field.interface.js';
// Services
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private utility: UtilityService) {}

  createLevel(data: Partial<Level>): Level {
    const level: Level = {
      name: data.name || '',
      settings: this.utility.deepCopy(data.settings!),
      constraints: data.constraints
        ? this.utility.deepCopy(data.constraints) 
        : this.utility.deepCopy(DEFAULT_CONSTRAINTS),
      portals: data.portals ? this.utility.deepCopy(data.portals) : undefined,
      enemies: data.enemies ? this.utility.deepCopy(data.enemies) : [],
      food: data.food ? this.utility.deepCopy(data.food) : []      
    };
    this.setObstacles(level, data.obstacles);
    return level;
  }

  private setObstacles(level: Level, obstacles?: LevelObstacles): void {
    if (!obstacles) return;
    if (obstacles.rocks) {
      obstacles.rocks.forEach(rock => this.addRock(level, rock));
    }
    if (obstacles.walls) {
      obstacles.walls.forEach(wall => this.addWall(level, wall));
    }
    if (obstacles.rockFields) {
      obstacles.rockFields.forEach(field => this.addRockField(level, field));
    }
  }

  private addRock(level: Level, position: Position): void {
    if (!this.isInsideGrid(level, position)) return;
    level.constraints.obstacles.push({ type: ObstacleType.rock, position });
  }

  private addWall(level: Level, wall: Line): void {
    const isHorizontal: boolean = [Direction.left, Direction.right].includes(wall.direction);
    const [toRight, toLeft, toTop, toBottom]: boolean[] = [
      wall.direction === Direction.right, wall.direction === Direction.left,
      wall.direction === Direction.up, wall.direction === Direction.down,
    ];
    for (let i = 0; i < wall.length; i++) {
      const position: Position = this.utility.shiftPosition(wall.position, wall.direction, i);
      if (!this.isInsideGrid(level, position)) break;
      const type: ObstacleType = isHorizontal
        ? (toRight && !i) || (toLeft && i === wall.length - 1)
          ? ObstacleType.wallEndLeft
          : (toLeft && !i) || (toRight && i === wall.length - 1)
            ? ObstacleType.wallEndRight
            : ObstacleType.wallHorizontal
        : (toBottom && !i) || (toTop && i === wall.length - 1)
          ? ObstacleType.wallEndTop
          : (toTop && !i) || (toBottom && i === wall.length - 1)
            ? ObstacleType.wallEndBottom
            : ObstacleType.wallVertical;
      level.constraints.obstacles.push({ type, position });
    }
  }

  private addRockField(level: Level, field: RockField): void {
    if (field.width < 1 || field.height < 1) return;
    for (let x = 0; x < field.width; x += field.gap + 1) {
      for (let y = 0; y < field.height; y += field.gap + 1) {
        if (this.isInsideGrid(level, { x, y }))
          this.addRock(level, { x: field.position.x + x, y: field.position.y - y });
      }
    }
  }

  private isInsideGrid(level: Level, position: Position): boolean {
    return position.x >= 0 && position.x <= level.constraints.width
      && position.y >= 0 && position.y <= level.constraints.height;
  }

}