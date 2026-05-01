import { ElementRef } from '@angular/core';
import { Model } from '../../../model/model';
import { ModelPath } from '../../../model/path/model-path';
import { ModelCurve } from '../../../model/path/model-curve';
import { ModelLine } from '../../../model/path/model-line';
import { ModelPoint } from '../../../model/path/model-point';

export class PathBuilder {

  private readonly width = 1500;
  private readonly height = 1000;

  private readonly path = new ModelPath();

  private context: CanvasRenderingContext2D;

  constructor(canvasElement: ElementRef<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number, private model: Model) {
    const canvas = canvasElement.nativeElement;
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    console.log(`canvasWidth: ${canvasWidth}, canvasHeight: ${canvasHeight}, dpr: ${dpr}`);
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    const scaleFactor = canvas.width / this.width;
    this.context.scale(scaleFactor, scaleFactor);
    this.context.transform(1, 0, 0, -1, 0, this.height);
  }

  draw(): void {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawPath();
    this.drawPosition();
    this.drawTest();
  }

  private drawLine(line: ModelLine): void {
    this.drawLineCoordinates(line.p1.x, line.p1.y, line.p2.x, line.p2.y);
  }

  private drawLineCoordinates(x1: number, y1: number, x2: number, y2: number): void {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  private drawGrid(): void {
    this.context.strokeStyle = 'lightgray';
    this.context.lineWidth = 1;
    for (let x = 100; x < this.width; x += 100) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
      this.context.stroke();
    }
    for (let y = 100; y < this.height; y += 100) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
      this.context.stroke();
    }
  }

  private drawText(text: string, x: number, y: number): void {
    this.context.font = '40px sans-serif';
    this.context.save();
    this.context.translate(x, y);
    this.context.scale(1, -1);
    this.context.fillText(text, 0, 0); // must be zero;zero
    this.context.restore();
  }

  private drawPath(): void {

    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 4;

    this.drawCurve(this.path.curve1);
    this.drawCurve(this.path.curve2);

    this.context.fillStyle = 'red';
    this.drawCurvePoints(this.path.curve1);
    this.context.fillStyle = 'green';
    this.drawCurvePoints(this.path.curve2);
  }

  private drawCurve(modelCurve: ModelCurve): void {
    const curve = modelCurve.curve;
    this.context.beginPath();
    this.context.moveTo(curve.start.x, curve.start.y);
    this.context.bezierCurveTo(
      curve.controlPoint1.x,
      curve.controlPoint1.y,
      curve.controlPoint2.x,
      curve.controlPoint2.y,
      curve.end.x,
      curve.end.y
    );
    this.context.stroke();
  }

  private drawCurvePoints(modelCurve: ModelCurve): void {
    const curve = modelCurve.curve;
    //this.drawPoint(curve.start);
    this.drawPoint(curve.controlPoint1);
    this.drawPoint(curve.controlPoint2);
    this.drawPoint(curve.end);
  }

  private drawPoint(point: ModelPoint): void {
    this.context.beginPath();
    this.context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
    this.context.fill();
  }

  private drawPosition(): void {

    const x = 100;
    const y = 900;

    this.context.strokeStyle = 'green';
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.height);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(0, y);
    this.context.lineTo(this.width, y);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(x, y, 50, 0, 2 * Math.PI);
    this.context.stroke();
  }

  private drawTest(): void {

    this.context.fillStyle = 'blue';
    this.context.strokeStyle = 'green';

    this.drawTestShoes(1);
    for (let d = 50; d < this.path.length; d += 50) {
      this.drawTestShoes(d);
    }
  }

  private drawTestShoes(distance: number): void {
    const normal = this.path.distanceToNormal(distance);
    this.drawLine(normal);
    this.drawPoint(normal.p1);
    this.drawPoint(normal.p2);
  }
}
