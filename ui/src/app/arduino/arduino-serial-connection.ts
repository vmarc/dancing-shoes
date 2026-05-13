export class ArduinoSerialConnection {

  private keepReading = true;

  constructor(
    private readonly port: SerialPort,
    private readonly reader: ReadableStreamDefaultReader<string>,
    private readonly writableStreamClosed: Promise<void>,
    private readonly onMessage: (message: string) => void
  ) {
    this.readLoop();
  }

  send(message: string): void {
    const writer = this.port.writable.getWriter();
    const encoded = new TextEncoder().encode(message);
    writer.write(encoded)
      .then(() => writer.releaseLock())
      .catch(error => {
        this.error(`could not send message: ${message}`, error);
      });
  }

  close(): void {
    this.keepReading = false;
    this.cancelReaderAndClosePort();
  }

  private cancelReaderAndClosePort(): void {
    this.reader.cancel()
      .then(() => {
        this.writableStreamClosed
          .then(() => this.closePort())
          .catch(error => this.closePort());
      })
      .catch(error => {
        this.error('could not cancel reader', error);
      });
  }

  private closePort(): void {
    this.port.close()
      .then(() => {
        this.log('port closed');
      })
      .catch(error => {
        this.error('could not close port', error);
      });
  }

  private async readLoop(): Promise<void> {
    try {
      while (this.keepReading) {
        const {value, done} = await this.reader.read();
        if (done) break;
        if (value) {
          this.onMessage(value);
        }
      }
    } catch (error) {
      this.error('Read loop error:', error);
    } finally {
      this.reader.releaseLock();
    }
  }

  private log(message: string): void {
    console.log(`Arduino: ${message}`);
  }

  private error(message: string, error?: unknown): void {
    console.error(`Arduino: ${message}`, ...(error ? [error] : []));
  }
}
