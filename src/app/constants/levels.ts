import { Level } from '../types/level';
import { LEVEL_1 } from './level-data/level-001';
import { LEVEL_2 } from './level-data/level-002';
import { LEVEL_3 } from './level-data/level-003';
import { LEVEL_4 } from './level-data/level-004';
import { LEVEL_5 } from './level-data/level-005';
import { LEVEL_6 } from './level-data/level-006';
import { LEVEL_7 } from './level-data/level-007';
import { LEVEL_8 } from './level-data/level-008';
import { LEVEL_9 } from './level-data/level-009';
import { LEVEL_10 } from './level-data/level-010';
import { LEVEL_11 } from './level-data/level-011';
import { LEVEL_12 } from './level-data/level-012';
import { LEVEL_13 } from './level-data/level-013';
import { LEVEL_14 } from './level-data/level-014';
import { LEVEL_15 } from './level-data/level-015';

export const LEVELS: Record<number, Partial<Level>> = {
  [1]: LEVEL_1,
  [2]: LEVEL_2,
  [3]: LEVEL_3,
  [4]: LEVEL_4,
  [5]: LEVEL_5,
  [6]: LEVEL_6,
  [7]: LEVEL_7,
  [8]: LEVEL_8,
  [9]: LEVEL_9,
  [10]: LEVEL_10,
  [11]: LEVEL_11,
  [12]: LEVEL_12,
  [13]: LEVEL_13,
  [14]: LEVEL_14,
  [15]: LEVEL_15
}