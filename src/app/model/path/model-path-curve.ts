import { ModelPoint } from './model-point';

export interface ModelPathCurve {
  start: ModelPoint;
  controlPoint1: ModelPoint;
  controlPoint2: ModelPoint;
  end: ModelPoint;
}
