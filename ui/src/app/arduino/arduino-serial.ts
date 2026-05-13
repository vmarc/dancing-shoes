import { LineBreakTransformer } from './line-break-transformer';
import { ArduinoSerialConnection } from './arduino-serial-connection';

export class ArduinoSerial {

  private readonly serialOptions: SerialOptions = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none'
  };

  private readonly serialPortRequestOptions: SerialPortRequestOptions = {
    filters: [{usbVendorId: 0x1a86, usbProductId: 0x7523},],
  };
  private connection: ArduinoSerialConnection | undefined;

  constructor(private readonly onMessage: (message: string) => void) {
  }

  isReady(): boolean {
    return !!this.connection;
  }

  init(): void {
    if (this.connection) {
      this.logError('serial port already open');
      return;
    }
    if (!('serial' in navigator)) {
      this.logError('browser does NOT support the Web Serial API');
      return;
    }
    this.requestPortAndOpen();
  }

  send(message: string): void {
    if (!this.connection) {
      this.logError(`could not send message: "${message}" (port not open)`);
    } else {
      this.connection.send(message);
    }
  }

  close(): void {
    if (this.connection) {
      this.connection.close();
      this.connection = undefined;
    }
  }

  private requestPortAndOpen(): void {
    navigator.serial.requestPort(this.serialPortRequestOptions)
      .then(port => {
        port.onconnect = this.onConnect;
        port.ondisconnect = this.onDisconnect;
        this.open(port);
      })
      .catch(error => {
        if (error.name === 'NotFoundError') {
          this.log('No port selected')
        } else {
          this.logError('Could not request serial port', error)
        }
      });
    this.log('requestPortAndOpen() end');
  }

  private open(port: SerialPort): void {
    port.open(this.serialOptions)
      .then(() => {
        this.log('serial port opened');
        this.initReader(port);
      })
      .catch(error => {
        console.error(error);
          this.logError('Could not open serial port', error);
          this.connection = undefined;
        }
      );
  }

  private onConnect(): void {
    this.log('serial port connected');
  }

  private onDisconnect(): void {
    this.logError('serial port disconnected');
    if (this.connection) {
      this.close();
    }
  }

  private initReader(port: SerialPort): void {
    const textDecoder = new TextDecoderStream();
    const writableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .getReader();

    this.connection = new ArduinoSerialConnection(port, reader, writableStreamClosed, this.onMessage);
  }

  private log(message: string): void {
    console.log(`Arduino: ${message}`);
  }

  private logError(message: string, error?: unknown): void {
    console.error(`Arduino: ${message}`, ...error ? [error] : []);
  }
}
