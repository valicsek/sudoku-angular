import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import { EDifficulty } from '../../shared/enums/shared.enums';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onPlayButtonClicked', () => {
    it('should navigate to sudoku board page', () => {
      const navigateSpy = spyOn(component.router, 'navigate');
      component.onPlayButtonClicked();
      expect(navigateSpy).toHaveBeenCalledWith(['/sudoku-board'], {
        queryParams: { difficulty: EDifficulty.Easy },
      });
    });
  });

  describe('difficultyLevels', () => {
    it('should contain all difficulty levels', () => {
      expect(component.difficultyLevels).toEqual([
        EDifficulty.Easy,
        EDifficulty.Medium,
        EDifficulty.Hard,
        EDifficulty.Random,
      ]);
    });
  });
});
