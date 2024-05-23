import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { SudokuBoardCellClickEvent } from '../sudoku-board.interface';
@Component({
  selector: 'app-sudoku-board-cell',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sudoku-board-cell.component.html',
  styleUrls: ['./sudoku-board-cell.component.css'],
})
export class SudokuBoardCellComponent {
  @Input() value!: number;
  @Input() row!: number;
  @Input() col!: number;
  @Output() cellClicked = new EventEmitter<SudokuBoardCellClickEvent>();

  get isEditable(): boolean {
    return this.value === 0;
  }

  isSelected: boolean = false;

  calculateBackgroundColor(): string {
    if (this.isSelected) {
      return 'selected';
    }
    return this.value ? 'has-value' : '';
  }

  @HostListener('click')
  onClickEvent(): void {
    this.isSelected = !this.isSelected;
    if (this.isEditable) {
      this.cellClicked.emit({
        row: this.row,
        col: this.col,
        value: this.value,
      });
    }
  }
}
