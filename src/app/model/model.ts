import { TimeLine } from './time-line';
import { signal } from '@angular/core';
import { TimeLineEvent } from './time-line-event';
import { Motor } from './motor';

export class Model {

  readonly X_MIN = 0;
  readonly X_MAX = 500;
  readonly Y_MIN = 0;
  readonly Y_MAX = 1500;
  readonly ROTATION_MIN = 0;
  readonly ROTATION_MAX = 270;

  private _x = signal<number>(0);
  private _y = signal<number>(0);
  private _rotation = signal<number>(0);
  private _limitSwitchX1 = signal<boolean>(true);
  private _limitSwitchX2 = signal<boolean>(false);
  private _limitSwitchY1 = signal<boolean>(true);
  private _limitSwitchY2 = signal<boolean>(false);
  private _limitSwitchR1 = signal<boolean>(true);
  private _limitSwitchR2 = signal<boolean>(false);
  private _shoeLeftDown = signal<boolean>(false);
  private _shoeRightDown = signal<boolean>(false);

  readonly x =  this._x.asReadonly();
  readonly y =  this._y.asReadonly();
  readonly rotation =  this._rotation.asReadonly();
  readonly shoeLeftDown = this._shoeLeftDown.asReadonly();
  readonly shoeRightDown = this._shoeRightDown.asReadonly();
  readonly limitSwitchX1 = this._limitSwitchX1.asReadonly();
  readonly limitSwitchX2 = this._limitSwitchX2.asReadonly();
  readonly limitSwitchY1 = this._limitSwitchY1.asReadonly();
  readonly limitSwitchY2 = this._limitSwitchY2.asReadonly();
  readonly limitSwitchR1 = this._limitSwitchR1.asReadonly();
  readonly limitSwitchR2 = this._limitSwitchR2.asReadonly();

  readonly motor1 = new Motor('XY-core 1');
  readonly motor2 = new Motor('XY-core 2');
  readonly motor3 = new Motor('Rotatie');

  readonly timeLine: TimeLine;

  constructor() {
    this.timeLine = new TimeLine();
    this.updateLimitSwitches();

    // initial values for testing purposes:
    this.motor1.updateDegrees(45);
    this.motor2.updateDegrees(120);
    this.motor3.updateDegrees(270);
  };

  tick(now: number): void {
    this.updateLimitSwitches();
    this._shoeLeftDown.set(this.isLeftDown(now));
    this._shoeRightDown.set(this.isRightDown(now));
  }

  private isLeftDown(now: number): boolean {
    return this.isDown(this.timeLine.eventsLeft, now);
  }

  private isRightDown(now: number): boolean {
    return this.isDown(this.timeLine.eventsRight, now);
  }

  private isDown(events: TimeLineEvent[], now: number): boolean {
    const event = events.find(event => {
      return now >= event.time1  && now <  event.time2 ;
    });
    return event != undefined;
  }

  private updateLimitSwitches(): void {
    this._limitSwitchX1.set(this.x() <= this.X_MIN);
    this._limitSwitchX2.set(this.x() >= this.X_MAX);
    this._limitSwitchY1.set(this.y() <= this.Y_MIN);
    this._limitSwitchY2.set(this.y() >= this.Y_MAX);
    this._limitSwitchR1.set(this.rotation() <= this.ROTATION_MIN);
    this._limitSwitchR2.set(this.rotation() >= this.ROTATION_MAX);
  }
}
