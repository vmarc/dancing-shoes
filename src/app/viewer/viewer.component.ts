import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ViewerService } from './viewer.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { AudioService } from '../audio/audio.service';
import { ModelService } from '../model/model.service';

@Component({
  selector: 'dss-viewer',
  template: `
    <div class="buttons">
      <button nz-button (click)="step()">
        step
      </button>
    </div>

    <canvas #3dCanvas height="400" width="600"></canvas>
  `,
  styles: `
    canvas {
      display: block;
      border: 1px solid black;
    }

    .buttons {
      margin-bottom: 1rem;
    }
  `,
  imports: [
    NzButtonComponent
  ],
  providers: [ViewerService]
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  readonly service = inject(ViewerService);
  private audioService = inject(AudioService);
  private modelService = inject(ModelService);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('3dCanvas');
  private animationIntervalId?: number;

  ngAfterViewInit(): void {
    const canvas = this.canvas();
    if (canvas) {
      this.service.init(canvas.nativeElement);
      this.animate();
    } else {
      console.error('3D canvas not found');
    }
  }

  ngOnDestroy(): void {
    if (this.animationIntervalId !== undefined) {
      clearInterval(this.animationIntervalId);
    }
  }

  step(): void {
    this.service.toggleShoe();
  }

  animate(): void {
    let step = 0;
    let nextStepTime = this.modelService.events[step].time;

    this.animationIntervalId = window.setInterval(() => {
      const now = this.audioService.now();
      if (now >= nextStepTime) {
        this.service.toggleShoe();
        step++;
        if (step < this.modelService.events.length) {
          nextStepTime = this.modelService.events[step].time;
        } else {
          clearInterval(this.animationIntervalId);
        }
      }
    }, 10);
  }
}
