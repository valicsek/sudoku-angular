import { Component, Input } from '@angular/core';
import { SudokuBoardRectangleComponent } from './sudoku-board-rectangle/sudoku-board-rectangle.component';

@Component({
  selector: 'app-sudoku-board',
  standalone: true,
  imports: [SudokuBoardRectangleComponent],
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.css',
})
export class SudokuBoardComponent {
  @Input() board: number[][] = [];
}
