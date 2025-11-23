import { Injectable } from '@angular/core';
// Constants & Enums
import { GameBlockType } from '../constants/blocks/game-block-type.enum';
import { GameBlockSubType } from '../types/game/game-block-sub-type.type';
import { ProtectedBlockType } from '../constants/blocks/level/protected-block-type.enum';
import { FoodType } from '../constants/blocks/level/food-type.enum';
import { EnemyType } from '../constants/blocks/level/enemy-type.enum';
// Interfaces & Types
import { Position } from '../types/general/position.interface';
import { Line } from '../types/general/line.interface';
import { Level } from '../types/level/level.interface';
import { Game } from '../types/game/game.interface';
import { GameBlockData } from '../types/game/game-block-data.interface';
// Services
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor(private utility: UtilityService) {}

  //===========================================================================
  //  Game Space Construction
  //===========================================================================

  createSpace(level: Level): GameBlockData[][] {
    return Array.from(
      { length: level.constraints.width },
      () => Array.from(
        { length: level.constraints.height },
        () => ({ type: GameBlockType.free })
      )
    );
  }

  //===========================================================================
  //  Set & Get
  //===========================================================================

  setBlock(space: GameBlockData[][], position: Position, data: GameBlockData): void {
    if (this.isOutsideSpace(space, position)) return;
    space[position.x][position.y] = { ...data };
  }

  getBlock(space: GameBlockData[][], position: Position): GameBlockData {
    return space[position.x][position.y];
  }

  availableSpace(space: GameBlockData[][], includeProtected: boolean = true): Position[] {
    const availale: Position[] = [];
    space.forEach((column, x) => {
      column.forEach((_, y) => {
        if (
          this.isOfType(space, { x, y }, GameBlockType.free) 
          || (includeProtected && this.isOfType(space, { x, y }, GameBlockType.protected))
        ) availale.push({ x, y });
      });
    });
    return availale;
  }

  //===========================================================================
  //  Space Block Check
  //===========================================================================

  isOutsideSpace(space: GameBlockData[][], position: Position): boolean {
    if (position.x < 0 || position.x > space.length - 1) return true;
    if (position.y < 0 || position.y > space[position.x].length - 1) return true;
    return false;
  }

  isOfType(
    space: GameBlockData[][],
    position: Position,
    type: GameBlockType, subType?:
    GameBlockSubType
  ): boolean {
    if (this.isOutsideSpace(space, position)) return false;
    const block: GameBlockData = this.getBlock(space, position);
    return subType ? block.type === type && block.subType === subType : block.type === type;
  } 

  //===========================================================================
  //  Space Protection
  //===========================================================================

  protectNeighborhood(
    space: GameBlockData[][],
    position: Position,
    margin: number,
    type: ProtectedBlockType
  ): void {
    this.utility.neighborhood(position, margin).forEach(position => {
      if (!this.isOfType(space, position, GameBlockType.free)) return;
      this.setBlock(space, position, { type: GameBlockType.protected, subType: type });
    });
  }

  unprotectNeighborhood(
    space: GameBlockData[][],
    position: Position,
    margin: number,
    type: ProtectedBlockType
  ): void {
    this.utility.neighborhood(position, margin).forEach(position => {
      if (!this.isOfType(space, position, GameBlockType.protected, type)) return;
      this.setBlock(space, position, { type: GameBlockType.free });
    });
  }

  protectLine(space: GameBlockData[][], line: Line, type: ProtectedBlockType): void {
    [...Array(line.length)].map((_, distance) => {
      const position: Position = this.utility.shiftPosition(line.position, line.direction, distance);
      this.protectNeighborhood(space, position, 0, type);
    });
  }

  unprotectLine(space: GameBlockData[][], line: Line, type: ProtectedBlockType): void {
    [...Array(line.length)].map((_, distance) => {
      const position: Position = this.utility.shiftPosition(line.position, line.direction, distance);
      this.unprotectNeighborhood(space, position, 0, type);
    });
  }

  //===========================================================================
  //  Event Detection
  //===========================================================================

  isCollisionAhead(game: Game, position: Position): boolean {
    return this.isOfType(game.space, position, GameBlockType.snake)
      || this.isOfType(game.space, position, GameBlockType.obstacle)
      || this.isOutsideSpace(game.space, position);
  }

  foodAhead(game: Game, position: Position): FoodType | null {
    return this.isOfType(game.space, position, GameBlockType.food)
      ? this.getBlock(game.space, position).subType as number as FoodType
      : null;
  }

  enemyAhead(game: Game, position: Position): EnemyType | null {
    return this.isOfType(game.space, position, GameBlockType.enemy)
      ? this.getBlock(game.space, position).subType as number as EnemyType
      : null;
  }

  portalAhead(game: Game, position: Position): Position | null {
    return this.isOfType(game.space, position, GameBlockType.portal)
      ? this.getBlock(game.space, position).portalTo || null
      : null;
  }

}