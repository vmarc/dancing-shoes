import { Injectable } from '@angular/core';
import { AudioEngine } from './audio-engine';
import { inject } from '@angular/core';
import { ModelService } from '../../../model/model.service';
import { signal } from '@angular/core';
import { effect } from '@angular/core';

@Injectable()
export class AudioService {
  private modelService = inject(ModelService);
  readonly minPxPerSec = signal<number>(100);

  private engine: AudioEngine | undefined;

  constructor() {
    effect(() => {
      this.engine?.zoom(this.minPxPerSec());
    });
  }

  init(): void {
    this.engine = new AudioEngine(this.modelService, this.minPxPerSec());
  }

  playPause(): void {
    this.engine?.playPause();
  }
}
