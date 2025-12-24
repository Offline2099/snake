import { Component, output } from '@angular/core';
import { NgClass } from '@angular/common';
// Constants & Enums
import { STORAGE_KEY } from '../../constants/storage';
import { LEVELS } from '../../constants/levels';
import { DEFAULT_LEVEL_STATE } from '../../constants/defaults';
// Interfaces & Types
import { Level } from '../../types/level/level.interface';
import { LevelState } from '../../types/level/level-state.interface';
// Pipes
import { SecondsAsTimePipe } from '../../pipes/seconds-as-time.pipe';

type LevelData = Omit<Partial<Level>, 'state'> & { state: LevelState };

@Component({
  selector: 'app-menu',
  imports: [NgClass, SecondsAsTimePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {

  levels: LevelData[];

  selected = output<number>();

  constructor() {
    this.setInitialStorageData();
    this.levels = this.getLevelStates();
  }

  setInitialStorageData(): void {
    const progressData: string | null = localStorage.getItem(STORAGE_KEY);
    if (progressData !== null) return;
    const initialData: string = JSON.stringify(LEVELS.map(level => ({
      ...DEFAULT_LEVEL_STATE,
      ...level.state
    })));
    localStorage.setItem(STORAGE_KEY, initialData);
  }

  getLevelStates(): LevelData[] {
    const data: LevelState[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    return LEVELS.map((level, id) => ({
      ...level,
      state: data[id]
    }));
  }

  selectLevel(id: number): void {
    this.selected.emit(id);
  }

}
