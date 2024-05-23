import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudokuBoardCellComponent } from './sudoku-board-cell.component';

describe('SudokuBoardCellComp0onent', () => {
  let component: SudokuBoardCellComponent;
  let fixture: ComponentFixture<SudokuBoardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuBoardCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuBoardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
