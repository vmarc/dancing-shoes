import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { AudioComponent } from './audio/audio.component';
import { ModelService } from './model/model.service';
import { AudioService } from './audio/audio.service';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet, ViewerComponent, AudioComponent],
  template: `
    <div class="app-container">
      <p>Hotel Bizarre - Dansende Schoentjes</p>
      <dss-viewer/>
      <dss-audio/>
    </div>
    <router-outlet/>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem;
    }
  `,
  providers: [AudioService, ModelService],
})
export class App {
}
