import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { form } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NoFocusDirective } from '../../components/nofocus.directive';
import { ArduinoService } from '../../../arduino/arduino.service';
import { inject } from '@angular/core';

@Component({
  selector: 'dss-stepper-steps',
  template: `
    <div class="content">Stappen</div>
    <form class="steps-form">
      <label>Aantal:</label>
      <nz-input-number [formField]="commandForm.stepCount" nzMin="1" nzMax="10000" placeholder="aantal"/>
      <label>Interval:</label>
      <nz-input-number [formField]="commandForm.interval" nzMin="100" nzMax="10000"/>
      <button nz-button class="control-button" type="button" (click)="send()">
        <nz-icon nzType="upload"/>
        versturen
      </button>
    </form>
  `,
  styles: `
    .steps-form {
      margin: 1em;
      display: inline-grid;
      grid-template-columns: auto auto;
      gap: 0.5em;
    }

    .steps-form button {
      grid-column: span 2;
    }
  `,
  imports: [
    FormField,
    NoFocusDirective,
    NzButtonComponent,
    NzIconDirective,
    NzInputNumberComponent,
  ],
})
export class StepperStepsComponent {
  private readonly arduinoService = inject(ArduinoService);

  commandModel = signal<StepperCommand>({
    stepCount: 100,
    interval: 4000,
  });
  commandForm = form(this.commandModel);

  send(): void {
    this.arduinoService.stepper();
  }
}
