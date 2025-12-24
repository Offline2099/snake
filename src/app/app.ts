import { Component } from '@angular/core';
import { GameComponent } from './components/game/game//game.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, GameComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  levelId: number = 1;
  isMenuActive: boolean = true;

  showMenu(): void {
    this.isMenuActive = true;
  }

  startLevel(id: number): void {
    this.levelId = id;
    this.isMenuActive = false;
  }

}
