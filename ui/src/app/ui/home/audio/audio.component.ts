import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AudioService } from './audio.service';
import { FormsModule } from '@angular/forms';
import { NzSliderComponent } from 'ng-zorro-antd/slider';

@Component({
  selector: 'dss-audio',
  template: `
    <div id="waveform" ></div>
    <nz-slider [nzMin]="10" [nzMax]="1000" [(ngModel)]="service.minPxPerSec"/>
  `,
  styles: `
    #waveform {
      display: block;
      border: 1px solid black;
      margin-right: 2em;
    }
  `,
  imports: [
    FormsModule,
    NzSliderComponent,
  ],
})
export class AudioComponent implements AfterViewInit {
  readonly service = inject(AudioService);

  ngAfterViewInit(): void {
    this.service.init();
  }
}
