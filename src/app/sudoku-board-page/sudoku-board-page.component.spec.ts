import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SudokuService } from '../services/sudoku.service';
import { SudokuBoardPageComponent } from './sudoku-board-page.component';
import { EDifficulty } from '../../shared/enums/shared.enums';
import { SUDOKU_BOARD_RECTANGLE_MOCK } from '../services/sudoku.service.mock';
import {
  SudokuServiceResponse,
  SudokuServiceSolveResponse,
  SudokuServiceValidateResponse,
} from '../services/sudoku.service.interface';

describe('SudokuBoardPageComponent', () => {
  let component: SudokuBoardPageComponent;
  let fixture: ComponentFixture<SudokuBoardPageComponent>;
  let sudokuService: SudokuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SudokuBoardPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ difficulty: EDifficulty.Easy }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuBoardPageComponent);
    component = fixture.componentInstance;
    sudokuService = TestBed.inject(SudokuService);

    spyOn(sudokuService, 'generateBoard').and.returnValue(
      of<SudokuServiceResponse>({ board: SUDOKU_BOARD_RECTANGLE_MOCK })
    );

    spyOn(sudokuService, 'validateBoard').and.returnValue(
      of<SudokuServiceValidateResponse>({ status: 'solved' })
    );

    spyOn(sudokuService, 'solveBoard').and.returnValue(
      of<SudokuServiceSolveResponse>({
        solution: SUDOKU_BOARD_RECTANGLE_MOCK,
        difficulty: EDifficulty.Easy,
        status: 'solved',
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load board on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.board).toEqual(SUDOKU_BOARD_RECTANGLE_MOCK);
  });

  it('should call validateBoard and get response', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onValidateButtonClicked();
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith({ status: 'solved' });
  });

  it('should call solveBoard and update board', () => {
    component.onSolveButtonClicked();
    fixture.detectChanges();
    expect(component.board).toEqual(SUDOKU_BOARD_RECTANGLE_MOCK);
  });
});
