import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';
import { SudokuService } from '../services/sudoku.service';
import { EDifficulty } from '../shared/enums/shared.enums';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SudokuBoardMenuComponent } from './sudoku-board-menu/sudoku-board-menu.component';
import { AsyncPipe } from '@angular/common';
import { SudokuBoardCellClickEvent } from './sudoku-board/sudoku-board.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sudoku-board-page',
  standalone: true,
  imports: [SudokuBoardComponent, SudokuBoardMenuComponent, AsyncPipe],
  templateUrl: './sudoku-board-page.component.html',
  styleUrls: ['./sudoku-board-page.component.css'],
})
export class SudokuBoardPageComponent implements OnInit, OnDestroy {
  private sudokuService = inject(SudokuService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  boardSolution: number[][] = [];
  numberOfMistakes = new BehaviorSubject<number>(0);
  selectedDifficulty: EDifficulty | null = null;
  selectedCell: SudokuBoardCellClickEvent | null = null;

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.handleDifficultyParams(params);
    });
    this.registerListenerForMistakes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onValidateButtonClicked() {
    this.sudokuService.validateBoard(this.board).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => console.log(response),
      error: () => alert('Validation failed'),
    });
  }

  onSolveButtonClicked() {
    this.solveBoard();
  }

  onNumberInputClicked(num: number) {
    if (this.selectedCell) {
      const { row, col } = this.selectedCell;
      if (this.boardSolution[row][col] === num) {
        this.board[row][col] = num;
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
    this.numberOfMistakes.next(0);
  }

  private handleDifficultyParams(params: any) {
    const difficulty = params['difficulty'] as EDifficulty;

    if (Object.values(EDifficulty).includes(difficulty)) {
      this.selectedDifficulty = difficulty;
      this.loadBoard(difficulty);
    } else {
      console.error('Invalid difficulty level');
      this.router.navigate(['/']);
    }
  }

  private registerListenerForMistakes() {
    this.numberOfMistakes.pipe(takeUntil(this.destroy$)).subscribe((mistakes) => {
      if (mistakes >= 3) {
        alert('Game over');
        this.board = this.boardSolution;
      }
    });
  }

  private loadBoard(difficulty: EDifficulty) {
    this.sudokuService.generateBoard(difficulty).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.board = response.board;
        this.loadBoardSolution();
      },
      error: () => this.router.navigate(['/']),
    });
  }

  private loadBoardSolution() {
    this.sudokuService.solveBoard(this.board).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => this.boardSolution = response.solution,
      error: () => alert('Failed to load board solution'),
    });
  }

  private solveBoard() {
    this.sudokuService.solveBoard(this.board).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => this.board = response.solution,
      error: () => alert('Failed to solve the board'),
    });
  }

  private handleIncorrectInput() {
    alert('Incorrect number input');
    this.numberOfMistakes.next(this.numberOfMistakes.value + 1);
  }
}
