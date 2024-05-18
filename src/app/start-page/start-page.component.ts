import { Component, inject } from '@angular/core';
import { EDifficulty } from '../../shared/enums/shared.enums';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  router = inject(Router);
  difficultyLevels: EDifficulty[] = Object.values(EDifficulty);

  /**
   * Event handler for the play button click event.
   */
  onPlayButtonClicked() {
    const queryParams = { difficulty: 'easy' };
    this.router.navigate(['/sudoku-board'], { queryParams });
  }
}
