import { ModelPoint } from './model-point';
import { ModelLine } from './model-line';
import { ModelCurve } from './model-curve';

export class ModelPath {

  readonly curve1: ModelCurve;
  readonly curve2: ModelCurve;
  readonly length: number;

  constructor() {
    this.curve1 = new ModelCurve({
      start: {x: 0, y: 0},
      controlPoint1: {x: 0, y: 1200},
      controlPoint2: {x: 700, y: 1150},
      end: {x: 800, y: 700},
    });
    this.curve2 = new ModelCurve({
      start: {x: 800, y: 700},
      controlPoint1: {x: 900, y: 200},
      controlPoint2: {x: 1200, y: 200},
      end: {x: 1500, y: 200},
    });
    this.length = this.curve1.length + this.curve1.length;
  }

  distanceToPosition(distance: number): ModelPoint {
    if (distance < this.curve1.length) {
      return this.curve1.distanceToPosition(distance);
    }
    return this.curve2.distanceToPosition(distance - this.curve1.length);
  }

  distanceToNormal(distance: number): ModelLine {
    if (distance < this.curve1.length) {
      return this.curve1.distanceToNormal(distance);
    }
    return this.curve2.distanceToNormal(distance - this.curve1.length);
  }
}
