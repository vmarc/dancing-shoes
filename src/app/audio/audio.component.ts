import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AudioService } from './audio.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dss-audio',
  imports: [NzButtonComponent, FormsModule, NzSliderComponent],
  template: `
    <nz-slider [nzMin]="10" [nzMax]="1000" [nzDefaultValue]="100" (nzOnAfterChange)="zoom($event)" />

    <div class="buttons">
      <button nz-button (click)="playPause()">
        play/pause
      </button>
    </div>
    <div id="waveform" height="400" width="600"></div>
  `,
  styles: `
    #waveform {
      display: block;
      border: 1px solid black;
    }

    .buttons {
      margin-bottom: 1rem;
    }

  `,
})
export class AudioComponent implements AfterViewInit{
  readonly service = inject(AudioService);

  ngAfterViewInit(): void {
    this.service.init();
  }

  playPause(): void {
    this.service.playPause();
  }

  zoom(event: number[] | number): void {
    if (!Array.isArray(event)) {
      this.service.zoom(event);
    }
  }
}
