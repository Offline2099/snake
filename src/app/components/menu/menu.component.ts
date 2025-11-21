import { Component, output } from '@angular/core';
import { LEVELS } from '../../constants/levels';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {

  readonly LEVELS = LEVELS;
  readonly levels = Object.keys(LEVELS).map(Number);

  selected = output<number>();

  selectLevel(id: number): void {
    this.selected.emit(id);
  }

}
