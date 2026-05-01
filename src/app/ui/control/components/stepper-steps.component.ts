import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzFormItemComponent } from 'ng-zorro-antd/form';

@Component({
  selector: 'dss-stepper-steps',
  imports: [NzButtonComponent, NzInputNumberComponent, FormField, NzIconDirective],
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
})
export class StepperStepsComponent {

  commandModel = signal<StepperCommand>({
    stepCount: 100,
    interval: 4000,
  });
  commandForm = form(this.commandModel);

  send(): void {
    console.log(`CONTROL send stepper command, stepCount=${this.commandModel().stepCount}, interval=${this.commandModel().interval}`);
  }
}
