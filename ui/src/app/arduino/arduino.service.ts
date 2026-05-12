import { Injectable } from '@angular/core';
import { ArduinoSerial } from './arduino-serial';
import { inject } from '@angular/core';
import { ModelService } from '../model/model.service';
import { effect } from '@angular/core';

@Injectable()
export class ArduinoService {
  private modelService = inject(ModelService);

  private serial: ArduinoSerial = new ArduinoSerial((message: string) => {
    console.log(`[Arduino] "${message}"`);
  });

  constructor() {
    effect(() => {
      const down = this.modelService.model.shoeLeftDown();
      if (this.serial.isReady()) {
        if (down) {
          this.leftShoeDown();
        } else {
          this.leftShoeUp();
        }
      }
    });
    effect(() => {
      const down = this.modelService.model.shoeRightDown();
      if (this.serial.isReady()) {
        if (down) {
          this.rightShoeDown();
        } else {
          this.rightShoeUp();
        }
      }
    });
  }

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

  private sendCommand(command: string): void {
    if (this.serial) {
      this.serial.send(command + "\n");
    } else {
      console.error(`No connection to Arduino "${command}"`);
    }
  }
}
