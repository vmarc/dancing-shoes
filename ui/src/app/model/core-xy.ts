export interface Delta {
  xDelta: number;
  yDelta: number;
}

export interface StepperTask {
  aStepInterval: number;
  aStepCount: number;
  bStepInterval: number;
  bStepCount: number;
}

export class CoreXY {

  private static STEPS_PER_REVOLUTION = 200;
  private static PULLY_WHEEL_DIAMETER = 20.0;
  private static DISTANCE_PER_REVOLUTION = Math.PI * this.PULLY_WHEEL_DIAMETER;
  private static MICRO_SECONDS_PER_MILLI = 1000;

// bool start_finite(uint8_t motor_index, uint32_t step_interval, uint32_t step_count);
  static calculateDelta(task: StepperTask): Delta {
    const aDelta = this.DISTANCE_PER_REVOLUTION * task.aStepCount / this.STEPS_PER_REVOLUTION;
    const bDelta = this.DISTANCE_PER_REVOLUTION * task.bStepCount / this.STEPS_PER_REVOLUTION;
    const xDelta = Math.round((aDelta + bDelta) / 2);
    const yDelta = Math.round((aDelta - bDelta) / 2);
    return {xDelta, yDelta};
  }

  static stepperTask(millis: number, delta: Delta): StepperTask {

    const aDelta = delta.xDelta + delta.yDelta;
    const bDelta = delta.xDelta - delta.yDelta;

    const aStepCount = Math.round(aDelta * this.STEPS_PER_REVOLUTION / this.DISTANCE_PER_REVOLUTION);
    const bStepCount = Math.round(bDelta * this.STEPS_PER_REVOLUTION / this.DISTANCE_PER_REVOLUTION);

    const aStepInterval = Math.round(millis * this.MICRO_SECONDS_PER_MILLI / aStepCount);
    const bStepInterval = Math.round(millis * this.MICRO_SECONDS_PER_MILLI / bStepCount);

    return {
      aStepInterval,
      aStepCount,
      bStepInterval,
      bStepCount,
    };
  }
}
