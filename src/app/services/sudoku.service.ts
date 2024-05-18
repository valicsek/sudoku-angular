import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EDifficulty } from '../../shared/enums/shared.enums';
import {
  SudokuServiceResponse,
  SudokuServiceSolveResponse,
  SudokuServiceValidateResponse,
} from './sudoku.service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  http = inject(HttpClient);

  private encodeBoard(board: number[][]): string {
    return board
      .map((row) => `%5B${encodeURIComponent(row.toString())}%5D`)
      .join('%2C');
  }

  private encodeParams(params: { [key: string]: number[][] }): string {
    return Object.keys(params)
      .map((key) => `${key}=%5B${this.encodeBoard(params[key])}%5D`)
      .join('&');
  }

  /**
   * Generates a Sudoku board with the specified difficulty level.
   * @param difficulty The difficulty level of the Sudoku board.
   * @returns An Observable that emits the generated Sudoku board.
   */
  generateBoard(difficulty: EDifficulty): Observable<SudokuServiceResponse> {
    return this.http.get<SudokuServiceResponse>(
      `https://sugoku.onrender.com/board?difficulty=${difficulty.toLowerCase()}`
    );
  }

  /**
   * Validates a Sudoku board.
   * @param board The Sudoku board to validate.
   * @returns An Observable that emits the validation result.
   */
  validateBoard(board: number[][]): Observable<SudokuServiceValidateResponse> {
    const data = { board };
    return this.http.post<SudokuServiceValidateResponse>(
      'https://sugoku.onrender.com/validate',
      this.encodeParams(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  /**
   * Solves a Sudoku board.
   * @param board The Sudoku board to solve.
   * @returns An Observable that emits the solution result.
   */
  solveBoard(board: number[][]): Observable<SudokuServiceSolveResponse> {
    const data = { board };
    return this.http.post<SudokuServiceSolveResponse>(
      'https://sugoku.onrender.com/solve',
      this.encodeParams(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }
}
