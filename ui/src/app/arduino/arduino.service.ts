import { Injectable } from '@angular/core';
import { ArduinoSerial } from './arduino-serial';

@Injectable()
export class ArduinoService {

  private serial: ArduinoSerial = new ArduinoSerial((message: string) => {
    console.log(`[Arduino] "${message}"`);
  });

  init(): void {
    this.serial.init();
  }

  destroy(): void {
    this.serial.close();
  }

  ledOn(): void {
    this.sendCommand('led-on');
  }

  ledOff(): void {
    this.sendCommand('led-off');
  }

  leftShoeOn(): void {
  }

  leftShoeOff(): void {
  }

  rightShoeOn(): void {
  }

  rightShoeOff(): void {
  }

  stepperForward(): void {
  }

  stepperBackward(): void {
  }

  private async sendCommand(command: string): Promise<void> {
    if (this.serial) {
      this.serial.sendData(command + "\n");
    } else {
      console.error(`No connection to Arduino "${command}"`);
    }
  }
}
