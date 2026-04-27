import { Injectable } from '@angular/core';
import { AudioEngine } from './audio-engine';
import { inject } from '@angular/core';
import { ModelService } from '../model/model.service';

@Injectable()
export class AudioService {
  private modelService = inject(ModelService);
  private engine: AudioEngine | undefined;

  init(): void {
    this.engine = new AudioEngine(this.modelService);
  }

  now(): number {
    return this.engine?.now() ?? 0;
  }

  playPause(): void {
    this.engine?.playPause();
  }

  zoom(minPxPerSec: number) {
    this.engine?.zoom(minPxPerSec);
  }
}
