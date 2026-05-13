export class LineBreakTransformer implements Transformer<string, string> {
  private buffer = '';

  transform(chunk: string, controller: TransformStreamDefaultController<string>): void {
    this.buffer += chunk.replaceAll('\r', '');
    let index = 0;
    while ((index = this.buffer.indexOf('\n')) >= 0) {
      const line = this.buffer.substring(0, index);
      if (line.length > 0) {
        controller.enqueue(line)
      }
      this.buffer = this.buffer.substring(index + 1);
    }
  }

  flush(controller: TransformStreamDefaultController<string>): void {
    if (this.buffer.length > 0) {
      controller.enqueue(this.buffer)
    }
  }
}
