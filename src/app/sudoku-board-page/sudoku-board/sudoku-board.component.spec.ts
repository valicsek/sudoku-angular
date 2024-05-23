import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuBoardComponent } from './sudoku-board.component';
import { SUDOKU_BOARD_RECTANGLE_MOCK, SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK } from '../../services/sudoku.service.mock';

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent;
  let fixture: ComponentFixture<SudokuBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuBoardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuBoardComponent);
    component = fixture.componentInstance;
    component.board = SUDOKU_BOARD_RECTANGLE_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a 9x9 board', () => {
    expect(component.board.length).toBe(9);
    component.board.forEach(row => {
      expect(row.length).toBe(9);
    });
  });
  it('should emit correct cell click event', () => {
    const testEvent = { row: 1, col: 1, value: 5 };
    spyOn(component.cellClicked, 'emit');
    component.cellClicked.emit(testEvent);
    expect(component.cellClicked.emit).toHaveBeenCalledWith(testEvent);
  });

  it('should match the board with the solution when solved', () => {
    component.board = SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK;
    fixture.detectChanges();
    expect(component.board).toEqual(SUDOKU_BOARD_RECTANGLE_SOLUTION_MOCK);
  });

});