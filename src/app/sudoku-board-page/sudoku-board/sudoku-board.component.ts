import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SudokuBoardCellComponent } from './sudoku-board-cell/sudoku-board-cell.component';
import { SudokuBoardCellClickEvent } from './sudoku-board.interface';

@Component({
  selector: 'app-sudoku-board',
  standalone: true,
  imports: [SudokuBoardCellComponent],
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.css']
})
export class SudokuBoardComponent {
  @Input() board: number[][] = [];
  @Output() cellClicked = new EventEmitter<SudokuBoardCellClickEvent>();

  onCellClicked($event: SudokuBoardCellClickEvent): void {
    this.cellClicked.emit($event);
  }
}
