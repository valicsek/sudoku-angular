import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';
import { SudokuService } from '../services/sudoku.service';
import { EDifficulty } from '../../shared/enums/shared.enums';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sudoku-board-page',
  standalone: true,
  imports: [SudokuBoardComponent],
  templateUrl: './sudoku-board-page.component.html',
  styleUrls: ['./sudoku-board-page.component.css'],
})
export class SudokuBoardPageComponent implements OnInit, OnDestroy {
  board: number[][] = [];
  sudokuService = inject(SudokuService);
  route = inject(ActivatedRoute);
  selectedDifficulty: EDifficulty | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.selectedDifficulty = EDifficulty.Random;
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['difficulty']) {
          this.selectedDifficulty = params['difficulty'] as EDifficulty;

          this.sudokuService
            .generateBoard(this.selectedDifficulty)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
              this.board = response.board;
            });
        }
      });
  }

  onValidateButtonClicked() {
    this.sudokuService
      .validateBoard(this.board)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(response);
      });
  }

  onSolveButtonClicked() {
    this.sudokuService
      .solveBoard(this.board)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.board = response.solution;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
