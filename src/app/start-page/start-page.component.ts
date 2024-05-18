import { Component } from '@angular/core';
import { EDifficulty } from '../../shared/enums/shared.enums';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  difficultyLevels: EDifficulty[] = Object.values(EDifficulty);

  /**
   * Event handler for the play button click event.
   * @throws {Error} - Throws an error indicating that the method is not implemented.
   */
  onPlayButtonClicked() {
    throw new Error('Not implemented');
  }
}
