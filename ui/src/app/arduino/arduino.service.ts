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

  leftShoeDown(): void {
    this.sendCommand('left-shoe-down');
  }

  leftShoeUp(): void {
    this.sendCommand('left-shoe-up');
  }

  rightShoeDown(): void {
    this.sendCommand('right-shoe-down');
  }

  rightShoeUp(): void {
    this.sendCommand('right-shoe-up');
  }

  stepper(): void {
    this.sendCommand('stepper');
  }

  stepperForward(): void {
    this.sendCommand('stepper-forward');
  }

  stepperBackward(): void {
    this.sendCommand('stepper-backward');
  }

  private async sendCommand(command: string): Promise<void> {
    if (this.serial) {
      this.serial.send(command + "\n");
    } else {
      console.error(`No connection to Arduino "${command}"`);
    }
  }
}
