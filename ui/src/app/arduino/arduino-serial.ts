import { LineBreakTransformer } from './line-break-transformer';
import { ArduinoSerialConnection } from './arduino-serial-connection';

const SERIAL_OPTIONS: SerialOptions = {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  bufferSize: 256,
  flowControl: 'none',
};

const SERIAL_PORT_REQUEST_OPTIONS: SerialPortRequestOptions = {
  filters: [{usbVendorId: 0x1a86, usbProductId: 0x7523}],
};

export class ArduinoSerial {

  private connection: ArduinoSerialConnection | undefined;

  constructor(private readonly onMessage: (message: string) => void) {
  }

  isReady(): boolean {
    return !!this.connection;
  }

  init(): void {
    if (this.connection) {
      this.error('serial port already open');
      return;
    }
    if (!('serial' in navigator)) {
      this.error('browser does NOT support the Web Serial API');
      return;
    }
    this.requestPortAndOpen();
  }

  send(message: string): void {
    if (!this.connection) {
      this.error(`could not send message: "${message}" (port not open)`);
      return;
    }
    this.connection.send(message);
  }

  close(): void {
    if (this.connection) {
      this.connection.close();
      this.connection = undefined;
    }
  }

  private requestPortAndOpen(): void {
    navigator.serial.requestPort(SERIAL_PORT_REQUEST_OPTIONS)
      .then(port => {
        port.onconnect = () => this.log('serial port connected');
        port.ondisconnect = () => {
          this.error('serial port disconnected');
          this.close();
        };
        this.open(port);
      })
      .catch(error => {
        if (error.name === 'NotFoundError') {
          this.log('No port selected')
        } else {
          this.error('Could not request serial port', error)
        }
      });
  }

  private open(port: SerialPort): void {
    port.open(SERIAL_OPTIONS)
      .then(() => {
        this.log('serial port opened');
        this.initReader(port);
      })
      .catch(error => this.error('Could not open serial port', error));
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

  private error(message: string, error?: unknown): void {
    console.error(`Arduino: ${message}`, ...(error ? [error] : []));
  }
}
