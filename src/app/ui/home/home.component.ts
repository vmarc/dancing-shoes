import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AudioComponent } from './audio/audio.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ViewerComponent } from './viewer/viewer.component';
import { AudioService } from './audio/audio.service';
import { ModelService } from '../../model/model.service';
import { ArduinoService } from '../../arduino/arduino.service';

@Component({
  selector: 'dss-home',
  template: `
    <div class="page">
      <div>
        <button nz-button nzType="primary" (click)="playPause()">
          play / pause
        </button>
      </div>
      <dss-viewer/>
      <dss-audio/>
    </div>
  `,
  styles: `
    .page {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  imports: [
    AudioComponent,
    NzButtonComponent,
    ViewerComponent
  ],
})
export class HomeComponent {
  private readonly title = inject(Title);
  private readonly audioService = inject(AudioService);
  private readonly modelService = inject(ModelService);
  private readonly arduinoService = inject(ArduinoService);
  readonly model = this.modelService.model;

  constructor() {
    this.title.setTitle("Dansende Schoentjes");
  }

  playPause(): void {
    this.audioService.playPause();
  }}
