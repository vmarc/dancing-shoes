import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewerService } from './viewer.service';
import { effect } from '@angular/core';
import { ModelService } from '../../../model/model.service';

@Component({
  selector: 'dss-viewer',
  template: `
    <canvas #3dCanvas ></canvas>
  `,
  styles: `
    canvas {
      display: block;
      border: 1px solid black;
      max-height: 400px;
      max-width: 600px;
      width: 100%;
    }
  `,
  providers: [ViewerService]
})
export class ViewerComponent implements AfterViewInit {
  readonly service = inject(ViewerService);
  readonly modelService = inject(ModelService);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('3dCanvas');

  constructor() {
    effect(() => {
      const leftDown = this.modelService.model.shoeLeftDown();
      const rightDown = this.modelService.model.shoeRightDown();
      this.service.render(leftDown, rightDown);
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvas();
    if (canvas) {
      this.service.init(canvas.nativeElement);
    } else {
      console.error('3D canvas not found');
    }
  }
}
