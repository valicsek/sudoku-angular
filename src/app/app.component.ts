import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SudokuStore } from './store/sudoku/sudoku.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [SudokuStore],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sudoku-angular';
}
