import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { SudokuBoardPageComponent } from './sudoku-board-page/sudoku-board-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    title: 'Start page',
  },
  {
    path: 'sudoku-board',
    component: SudokuBoardPageComponent,
    title: 'Sudoku board',
  },
];
