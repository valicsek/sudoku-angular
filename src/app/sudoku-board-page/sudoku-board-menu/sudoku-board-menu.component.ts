import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sudoku-board-menu',
  standalone: true,
  imports: [],
  templateUrl: './sudoku-board-menu.component.html',
  styleUrls: ['./sudoku-board-menu.component.css']
})
export class SudokuBoardMenuComponent {
  @Output() validateClicked = new EventEmitter<void>();
  @Output() solveClicked = new EventEmitter<void>();
  @Output() numberInputClicked = new EventEmitter<number>();
  @Output() restartClicked = new EventEmitter<void>();

  onValidateClicked() {
    this.validateClicked.emit();
  }

  onSolveClicked() {
    this.solveClicked.emit();
  }

  onRestartClicked() {
    this.restartClicked.emit();
  }

  onNumberInputClicked(num: number) {
    this.numberInputClicked.emit(num);
  }
}
