import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SudokuBoardMenuComponent } from './sudoku-board-menu.component';

describe('SudokuBoardMenuComponent', () => {
  let component: SudokuBoardMenuComponent;
  let fixture: ComponentFixture<SudokuBoardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuBoardMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SudokuBoardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNumberInput when a number button is clicked', () => {
    const numberButton = fixture.debugElement.query(By.css('[data-test-id="number-input-1"]'));
    const numberInputSpy = spyOn(component, 'onNumberInputClicked');
    numberButton.triggerEventHandler('click', 1);
    expect(numberInputSpy).toHaveBeenCalledTimes(1);
    expect(numberInputSpy).toHaveBeenCalledWith(1);
  });

  it('should call onValidate when the validate button is clicked', () => {
    const validateButton = fixture.debugElement.query(By.css('[data-test-id="validate-button"]'));
    const validateSpy = spyOn(component, 'onValidateClicked');
    validateButton.triggerEventHandler('click', null);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onSolve when the solve button is clicked', () => {
    const solveButton = fixture.debugElement.query(By.css('[data-test-id="solve-button"]'));
    const solveSpy = spyOn(component, 'onSolveClicked');
    solveButton.triggerEventHandler('click', null);
    expect(solveSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onRestart when the restart button is clicked', () => {
    const restartButton = fixture.debugElement.query(By.css('[data-test-id="restart-button"]'));
    const restartSpy = spyOn(component, 'onRestartClicked');
    restartButton.triggerEventHandler('click', null);
    expect(restartSpy).toHaveBeenCalledTimes(1);
  });
});

