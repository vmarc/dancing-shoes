import { getTAtLength } from 'flo-bezier3';
import { evalDeCasteljau } from 'flo-bezier3';
import { length } from 'flo-bezier3';

export interface ModelPoint {
  x: number;
  y: number;
}

export interface ModelLine {
  p1: ModelPoint;
  p2: ModelPoint;
}

export interface ModelPathCurve {
  start: ModelPoint;
  controlPoint1: ModelPoint;
  controlPoint2: ModelPoint;
  end: ModelPoint;
}

export class ModelCurve {
  private readonly curveCoordinates: number[][];
  private readonly distanceBetweenShoes = 100;
  readonly length;

  constructor(
    readonly curve: ModelPathCurve) {
    this.curveCoordinates = this.toCurve(curve);
    this.length = length([0, 1], this.curveCoordinates);
  }

  distanceToPosition(distance: number): ModelPoint {
    const t = getTAtLength(this.curveCoordinates, distance);
    const coordinate = evalDeCasteljau(this.curveCoordinates, t);
    return {x: coordinate[0], y: coordinate[1]};
  }

  distanceToNormal(distance: number): ModelLine {
    const p1 = this.distanceToPosition(distance - 0.5);
    const p2 = this.distanceToPosition(distance + 0.5);
    const center = {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
    const p1atOrigin = {x: p1.x - center.x, y: p1.y - center.y};
    const p2atOrigin = {x: p2.x - center.x, y: p2.y - center.y};

    const a = p1atOrigin.y;
    const b = p2atOrigin.y;

    const p1rotated: ModelPoint = {x: a, y: -p1atOrigin.x};
    const p2rotated: ModelPoint = {x: b, y: -p2atOrigin.x};

    const scaleFactor = this.distanceBetweenShoes;

    const p1scaled = {x: p1rotated.x * scaleFactor, y: p1rotated.y * scaleFactor};
    const p2scaled = {x: p2rotated.x * scaleFactor, y: p2rotated.y * scaleFactor};

    const p1atCenter = {x: p1scaled.x + center.x, y: p1scaled.y + center.y};
    const p2atCenter = {x: p2scaled.x + center.x, y: p2scaled.y + center.y};

    return {p1: p1atCenter, p2: p2atCenter};
  }

  private toCurve(curve: ModelPathCurve): number[][] {
    return [
      [curve.start.x, curve.start.y],
      [curve.controlPoint1.x, curve.controlPoint1.y],
      [curve.controlPoint2.x, curve.controlPoint2.y],
      [curve.end.x, curve.end.y]
    ];
  }
}

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
