import { LineBreakTransformer } from './line-break-transformer';
import { vi } from 'vitest';

describe('line-break-transformer', () => {

  let transformer: LineBreakTransformer;
  let controller: any;

  beforeEach(() => {
    transformer = new LineBreakTransformer();
    controller = {
      enqueue: vi.fn(),
    };
  });

  it('line break', () => {

    transformer.transform('test\r\n', controller);

    expect(controller.enqueue.mock.calls).toEqual([
      ['test'],
    ]);
  });

  it('line break without carriage return', () => {

    transformer.transform('test\n', controller);

    expect(controller.enqueue.mock.calls).toEqual([
      ['test'],
    ]);
  });

  it('character per character', () => {

    transformer.transform('t', controller);
    transformer.transform('e', controller);
    transformer.transform('s', controller);
    transformer.transform('t', controller);
    transformer.transform('\r', controller);
    transformer.transform('\n', controller);

    expect(controller.enqueue.mock.calls).toEqual([
      ['test'],
    ]);
  });

  it('irregular chunks', () => {

    transformer.transform('tes', controller);
    transformer.transform('t\r\n', controller);

    expect(controller.enqueue.mock.calls).toEqual([
      ['test'],
    ]);
  });

  it('multiple lines', () => {

    transformer.transform('test1\r\ntest2\r\naa', controller);

    expect(controller.enqueue.mock.calls).toEqual([
      ['test1'],
      ['test2'],
    ]);
  });

  it('empty lines', () => {

    transformer.transform('\r\n\r\n\r\n', controller);

    expect(controller.enqueue.mock.calls).toEqual([]);
  });

  it('flushes remaining buffer', () => {
    transformer.transform('test', controller);
    transformer.flush(controller);
    expect(controller.enqueue.mock.calls).toEqual([
      ['test']
    ]);
  });

  it('upon flush, no message enqued if buffer empty', () => {
    transformer.transform('', controller);
    transformer.flush(controller);
    expect(controller.enqueue.mock.calls).toEqual([]);
  });

});
