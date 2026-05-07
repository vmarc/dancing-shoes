import { CoreXY } from './core-xy';

describe('core-xy', () => {
  it('generate task and calculate delta from task', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 200, yDelta: 100});

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 200, yDelta: 100});
  });

  it('right-down', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 200, yDelta: 200});
    expect(task.bStepCount).toBe(0);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 200, yDelta: 200});
  });

  it('right-down almost', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 201, yDelta: 200});
    expect(task.bStepCount).toBe(3);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 201, yDelta: 200});
  });

  it('right', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 200, yDelta: 0});
    expect(task.aStepInterval).toBe(task.bStepInterval);
    expect(task.aStepCount).toBe(task.bStepCount);
    expect(task.aStepCount).toBeGreaterThan(0);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 200, yDelta: 0});
  });

  it('left', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: -200, yDelta: 0});
    expect(task.aStepInterval).toBe(task.bStepInterval);
    expect(task.aStepCount).toBe(task.bStepCount);
    expect(task.aStepCount).toBeLessThan(0);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: -200, yDelta: 0});
  });

  it('up', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 0, yDelta: 200});
    expect(task.aStepInterval).toBe(-task.bStepInterval);
    expect(task.aStepCount).toBe(-task.bStepCount);
    expect(task.aStepCount).toBeGreaterThan(0);
    expect(task.bStepCount).toBeLessThan(0);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 0, yDelta: 200});
  });

  it('down', () => {

    const task = CoreXY.stepperTask(5000, {xDelta: 0, yDelta: -200});
    expect(task.aStepInterval).toBe(-task.bStepInterval);
    expect(task.aStepCount).toBe(-task.bStepCount);
    expect(task.aStepCount).toBeLessThan(0);
    expect(task.bStepCount).toBeGreaterThan(0);

    const delta = CoreXY.calculateDelta(task);
    expect(delta).toStrictEqual({xDelta: 0, yDelta: -200});
  });
});
