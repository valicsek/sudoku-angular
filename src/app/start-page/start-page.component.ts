import { Component, inject } from '@angular/core';
import { EDifficulty } from '../../shared/enums/shared.enums';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  router = inject(Router);
  difficultyLevels: EDifficulty[] = Object.values(EDifficulty);
  selectedDifficulty: EDifficulty = EDifficulty.Easy;

  /**
   * Event handler for the play button click event.
   */
  onPlayButtonClicked() {
    const queryParams = { difficulty: this.selectedDifficulty };
    this.router.navigate(['/sudoku-board'], { queryParams });
  }
}
