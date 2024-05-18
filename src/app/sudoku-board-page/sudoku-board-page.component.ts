import { Component } from '@angular/core';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';
import { SUDOKU_BOARD_RECTANGLE_MOCK } from './sudoku-board-rectangle.mock';

@Component({
  selector: 'app-sudoku-board-page',
  standalone: true,
  imports: [SudokuBoardComponent],
  templateUrl: './sudoku-board-page.component.html',
  styleUrl: './sudoku-board-page.component.css',
})
export class SudokuBoardPageComponent {
  board: number[][] = SUDOKU_BOARD_RECTANGLE_MOCK;
}
