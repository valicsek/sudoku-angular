import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuBoardRectangleComponent } from './sudoku-board-rectangle.component';

describe('SudokuBoardRectangleComponent', () => {
  let component: SudokuBoardRectangleComponent;
  let fixture: ComponentFixture<SudokuBoardRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuBoardRectangleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuBoardRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
