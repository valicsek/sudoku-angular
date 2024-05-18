import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sudoku-board-rectangle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sudoku-board-rectangle.component.html',
  styleUrl: './sudoku-board-rectangle.component.css',
})
export class SudokuBoardRectangleComponent {
  @Input() value: number = 0;

  isEditable: boolean = this.value === 0;

  calculateBackgroundColor(): string {
    return this.value ? 'has-value' : '';
  }
}
