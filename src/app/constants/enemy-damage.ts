import { EnemyType } from '../types/level';

export const DAMAGE: Record<EnemyType, number> = {
  [EnemyType.pile]: 2,
  [EnemyType.fire]: 5
}