import { Component } from '@angular/core';
import { input } from '@angular/core';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Model } from '../../../model/model';
import { PathBuilder } from './path-builder';

@Component({
  selector: 'dss-path',
  template: `
    <div class="canvas">
      <canvas #pathCanvas></canvas>
    </div>
  `,
  styles: `
    .canvas {
      width: 602px;
      height: 402px;
      border: 1px solid black;
    }
  `,
  imports: [
  ]
})
export class PathComponent {
  readonly model = input.required<Model>();

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('pathCanvas');

  constructor() {
    setTimeout(() => this.draw(),  0);
  }

  private draw(): void {
    const canvas = this.canvas();
    if (canvas) {
      new PathBuilder(canvas, 600, 400,this.model()).draw();
    }
  }
}
