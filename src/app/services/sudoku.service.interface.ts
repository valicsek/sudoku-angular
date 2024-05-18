export interface SudokuServiceResponse {
  board: number[][];
}

export interface SudokuServiceValidateResponse {
  status: 'solved' | 'broken';
}

export interface SudokuServiceSolveResponse {
  difficulty: string;
  solution: number[][];
  status: string;
}
