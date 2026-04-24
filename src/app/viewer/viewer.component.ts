import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewerService } from './viewer.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';

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
export class ViewerComponent implements AfterViewInit {
  readonly service = inject(ViewerService);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('3dCanvas');

  ngAfterViewInit(): void {
    const canvas = this.canvas();
    if (canvas) {
      this.service.init(canvas.nativeElement);
    } else {
      console.error('3D canvas not found');
    }
  }

  step(): void {
    this.service.toggleShoe();
  }
}
