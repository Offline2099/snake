import { FoodType } from '../../constants/blocks/level/food-type.enum';
import { Position } from '../general/position.interface';

export interface SnakeFood {
  type: FoodType;
  position: Position;
}