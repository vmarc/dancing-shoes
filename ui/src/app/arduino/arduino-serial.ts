export class ArduinoSerial {

  private readonly serialOptions: SerialOptions = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none'
  };

  private serialPort: SerialPort | undefined;
  private reader: ReadableStreamDefaultReader<string> | undefined;
  private readableStreamClosed: Promise<void> | undefined;
  private keepReading = true;

  constructor(private readonly onMessage: (message: string) => void) {
  }

  init(): void {
    if (this.serialPort) {
      this.error('serial port already open');
      return;
    }
    this.keepReading = true;
    if (!('serial' in navigator)) {
      this.error('browser does NOT support the Web Serial API');
      return;
    }
    this.requestPortAndOpen();
  }

  async send(message: string): Promise<void> {
    if (!this.serialPort?.writable) {
      this.error('port is not writable');
      return;
    }
    const writer = this.serialPort.writable.getWriter();
    try {
      await writer.write(new TextEncoder().encode(message));
    } catch (error) {
      this.error(`could not send message: ${message}`, error);
    } finally {
      writer.releaseLock();
    }
  }

  async close(): Promise<void> {
    this.keepReading = false;
    try {
      await this.reader?.cancel();
      await this.readableStreamClosed;
      await this.serialPort?.close()
      this.log('port closed');
    } catch(error) {
        this.error('could not close port', error);
    }
  }

  private async requestPortAndOpen(): Promise<void> {
    try {
      this.serialPort = await navigator.serial.requestPort();
      this.serialPort.onconnect = () => this.log('serial port connected');
      this.serialPort.ondisconnect = () => {
        this.keepReading = false;
        this.serialPort = undefined;
        this.reader = undefined;
        this.readableStreamClosed = undefined;
        this.error('serial port disconnected');
      }
      await this.serialPort.open(this.serialOptions);
      await this.readLoop();
    } catch (error) {
      this.error('could not open port', error);
    }
  }

  private async readLoop(): Promise<void> {
    if (!this.serialPort) return;

    const textDecoder = new TextDecoderStream();
    this.readableStreamClosed = this.serialPort.readable.pipeTo(textDecoder.writable);
    if (textDecoder.readable) {
      this.reader = textDecoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();

      try {
        while (this.keepReading) {
          const {value, done} = await this.reader.read();
          if (done) break;
          if (value) this.onMessage(value);
        }
      } catch (error) {
        this.error('Read error:', error);
      } finally {
        this.reader.releaseLock();
      }
    }
  }

  private log(message: string): void {
    console.log(`Arduino: ${message}`);
  }

  private error(message: string, error?: unknown): void {
    if (error) {
      console.error(`Arduino: ${message}`, error);
    }
    else {
      console.error(`Arduino: ${message}`);
    }
  }
}

class LineBreakTransformer implements Transformer<string, string> {
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
