import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuBoardPageComponent } from './sudoku-board-page.component';

describe('SudokuBoardPageComponent', () => {
  let component: SudokuBoardPageComponent;
  let fixture: ComponentFixture<SudokuBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuBoardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SudokuBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
