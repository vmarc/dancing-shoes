import { Component } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { inject } from '@angular/core';
import { ArduinoService } from '../../../arduino/arduino.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NoFocusDirective } from '../../components/nofocus.directive';

@Component({
  selector: 'dss-stepper-direction',
  template: `
    <div>Richting</div>
    <div class="buttons">
      <button nz-button (click)="backward()">
        <nz-icon nzType="arrow-left"/>
      </button>
      <button nz-button (click)="forward()">
        <nz-icon nzType="arrow-right"/>
      </button>
    </div>
  `,
  styles: `
    .buttons {
      display: flex;
      flex-direction: row;
      margin: 1em;
      gap: 0.5em;
    }
  `,
  imports: [
    NoFocusDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
})
export class StepperDirectionComponent {
  private readonly service = inject(ArduinoService);

  backward(): void {
    this.service.stepperForward();
  }

  forward(): void {
    this.service.stepperBackward();
  }
}
