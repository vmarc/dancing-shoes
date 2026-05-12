export class LineBreakTransformer implements Transformer<string, string> {
  private chunks = '';

  transform(chunk: string, controller: TransformStreamDefaultController<string>): void {
    this.chunks += chunk;
    const lines = this.chunks.split('\n');
    const line = lines.pop();
    if (line === undefined) return;
    this.chunks = line;
    lines.forEach(line => controller.enqueue(line));
  }

  flush(controller: TransformStreamDefaultController<string>): void {
    if (this.chunks === '') return;
    controller.enqueue(this.chunks);
  }
}
