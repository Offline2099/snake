import { EnemyType } from './blocks/level/enemy-type.enum';

export const DAMAGE: Record<EnemyType, number> = {
  [EnemyType.pile]: 2,
  [EnemyType.fire]: 5
}