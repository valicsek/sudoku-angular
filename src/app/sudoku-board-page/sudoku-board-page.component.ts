import { Component, OnInit, inject } from '@angular/core';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';
import { EDifficulty } from '../shared/enums/shared.enums';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SudokuBoardMenuComponent } from './sudoku-board-menu/sudoku-board-menu.component';
import { AsyncPipe } from '@angular/common';
import { SudokuBoardCellClickEvent } from './sudoku-board/sudoku-board.interface';
import { SudokuStore } from '../store/sudoku/sudoku.store';

@Component({
  selector: 'app-sudoku-board-page',
  standalone: true,
  imports: [SudokuBoardComponent, SudokuBoardMenuComponent, AsyncPipe],
  templateUrl: './sudoku-board-page.component.html',
  styleUrls: ['./sudoku-board-page.component.css'],
})
export class SudokuBoardPageComponent implements OnInit {
  // private sudokuService = inject(SudokuService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly store = inject(SudokuStore);
  selectedDifficulty: EDifficulty | null = null;
  selectedCell: SudokuBoardCellClickEvent | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.handleDifficultyParams(params);
    });
  }

  onValidateButtonClicked() {
    this.store.validateBoard();
  }

  onSolveButtonClicked() {
    this.store.solveBoard();
  }

  onNumberInputClicked(num: number) {
    if (this.selectedCell) {
      const { row, col } = this.selectedCell;
      if (this.store.boardSolution()[row][col] === num) {
        this.store.setBoardByRowColumn(row, col, num);
      } else {
        this.handleIncorrectInput();
      }
    }
  }

  onCellClicked(event: SudokuBoardCellClickEvent) {
    this.selectedCell = event;
  }

  onRestartButtonClicked() {
    if (this.selectedDifficulty) {
      this.loadBoard(this.selectedDifficulty);
    }
    this.selectedCell = null;
  }

  private handleDifficultyParams(params: Params) {
    const difficulty = params['difficulty'] as EDifficulty;

    if (Object.values(EDifficulty).includes(difficulty)) {
      this.selectedDifficulty = difficulty;
      this.store.generateBoard(difficulty);
    } else {
      console.error('Invalid difficulty level');
      this.router.navigate(['/']);
    }
  }

  private loadBoard(difficulty: EDifficulty) {
    this.store.generateBoard(difficulty);
  }

  private handleIncorrectInput() {
    alert('Your tip was wrong!');
    this.store.incrementMistakes();
    if (this.store.nuOfMistakes() > 3) {
      alert('Game over');
      this.store.setBoard(this.store.boardSolution());
      this.store.resetMistakes();
    }
  }
}
