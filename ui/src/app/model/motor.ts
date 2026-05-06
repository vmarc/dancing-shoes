import { signal } from '@angular/core';

export class Motor {

  private readonly _taskStepInterval = signal<number>(0);
  private readonly _taskStepCount = signal<number>(0);
  private readonly _taskStart = signal<number>(0);
  private readonly _taskEnd = signal<number>(0);
  private readonly _stepsPerRevolution = signal<number>(0);
  private readonly _rotation = signal<number>(0);
  private readonly _degrees = signal<number>(0);

  readonly taskStepInterval = this._taskStepInterval.asReadonly();
  readonly taskStepCount = this._taskStepCount.asReadonly();
  readonly taskStart = this._taskStart.asReadonly();
  readonly taskEnd = this._taskEnd.asReadonly();
  readonly stepsPerRevolution = this._stepsPerRevolution.asReadonly();
  readonly rotation = this._rotation.asReadonly();
  readonly degrees = this._degrees.asReadonly();

  constructor(readonly label: string) {
  }

  updateDegrees(value: number): void {
    this._degrees.set(value);
  }

  tick(now: number): void {
  }
}
