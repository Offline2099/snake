import { ProtectedBlockType } from '../../constants/blocks/level/protected-block-type.enum';
import { ObstacleType } from '../../constants/blocks/level/obstacle-type.enum';
import { PortalType } from '../../constants/blocks/level/portal-type.enum';
import { EnemyType } from '../../constants/blocks/level/enemy-type.enum';
import { FoodType } from '../../constants/blocks/level/food-type.enum';
import { SnakeBodyBlockType } from '../../constants/blocks/snake/snake-body-block-type-enum';

export type GameBlockSubType = 
  ProtectedBlockType | ObstacleType | PortalType | EnemyType | FoodType | SnakeBodyBlockType;