import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SudokuService } from './sudoku.service';
import {
  SUDOKU_BOARD_RECTANGLE_MOCK,
  SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK,
} from './sudoku.service.mock';
import { SudokuServiceValidateResponse } from './sudoku.service.interface';

describe('SudokuService', () => {
  let service: SudokuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SudokuService],
    });
    service = TestBed.inject(SudokuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateBoard', () => {
    it('should have a method called validateBoard', () => {
      expect(service.validateBoard).toBeDefined();
    });

    it('should return a valid response', () => {
      const mockResponse: SudokuServiceValidateResponse = { status: 'solved' };

      service.validateBoard(SUDOKU_BOARD_RECTANGLE_MOCK).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://sugoku.onrender.com/validate');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('solveBoard', () => {
    it('should have a method called solveBoard', () => {
      expect(service.solveBoard).toBeDefined();
    });

    it('should return a solution', () => {
      const mockSolution = { solution: SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK };

      service.solveBoard(SUDOKU_BOARD_RECTANGLE_MOCK).subscribe((res) => {
        expect(res.solution).toEqual(SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK);
      });

      const req = httpMock.expectOne('https://sugoku.onrender.com/solve');
      expect(req.request.method).toBe('POST');
      req.flush(mockSolution);
    });
  });
});
