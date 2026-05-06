export class ArduinoSerial {

  private serialOptions: SerialOptions = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none'
  };
  private serialPort: SerialPort | undefined;
  private reader: ReadableStreamDefaultReader<string> | undefined;

  private writer: any;
  private readFunction: Function;
  private readableStreamClosed: any;
  private writableStreamClosed: any;
  private keepReading: boolean = true;

  constructor(readFunction: (message: string) => void) {
    this.readFunction = readFunction;
  }

  init(): void {
    this.keepReading = true;
    if (!("serial" in navigator)) {
      console.error("This browser does NOT support the Web Serial API");
      return;
    }
    this.requestPortAndOpen();
  }

  send(message: string): void {

    console.log("send: ", message /*, this.writer*/);

    // await this.writer.write(data);

    const encoder = new TextEncoder();
    if (this.serialPort) {
      const writer = this.serialPort.writable.getWriter();
      writer.write(encoder.encode(message))
        .then(() => {
          console.log("sending data ok: ", message);
        })
        .catch((err: any) => {
          console.error("Error sending data: ", err);
        });
      writer.releaseLock();
    }
  }

  private requestPortAndOpen(): void {
    let nav: Navigator = navigator;
    nav.serial.requestPort()
      .then(port => {
        this.serialPort = port;
        this.initializePort()
        this.openPortAndReadLoop();
      })
      .catch(error => {
        console.error("Could not request port: " + error);
      });
  }

  private openPortAndReadLoop(): void {
    if (this.serialPort) {
      this.serialPort.open(this.serialOptions)
        .then(() => {
          this.readLoop();
        })
        .catch(error => {
          console.error("Opening port error: " + error);
        });
    }
  }

  private initializePort(): void {
    if (this.serialPort) {
      this.serialPort.onconnect = () => {
        console.log("Serial port connected");
      };
      this.serialPort.ondisconnect = () => {
        console.error("Serial port disconnected");
      };
    }
  }

  private async readLoop(): Promise<void> {
    if (this.serialPort) {
      const textDecoder = new TextDecoderStream();
      this.readableStreamClosed = this.serialPort.readable.pipeTo(textDecoder.writable);
      this.reader = textDecoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();
      while (this.serialPort.readable) {
        try {
          let ready = false;
          while (!ready && this.serialPort.readable && this.keepReading) {
            const {value, done} = await this.reader.read();
            if (done) {
              console.log("reader has been canceled");
              ready = true;
            } else if (value) {
              console.log("value");
              this.readFunction(value);
            }
          }
        } catch (error) {
          // Handle |error|...
        } finally {
          this.reader.releaseLock();
        }
      }
    }
  }

  close(): void {
    this.keepReading = false;
    if (this.reader) {
      this.reader.cancel();
    }
    this.readableStreamClosed.then(() => {
      // this.writer.close();
      this.writableStreamClosed.then(() => {
        if (this.serialPort) {
          this.serialPort.close().then(() => {
              console.log("Port closed");
            }
          );
        }
      });
    }).catch(() => {
    });
  }
}

class LineBreakTransformer implements Transformer<string, string> {
  private chunks = "";

  transform(chunk: string, controller: TransformStreamDefaultController<string>) {
    this.chunks += chunk;
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop()!;
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller: TransformStreamDefaultController<string>) {
    controller.enqueue(this.chunks);
  }
}
