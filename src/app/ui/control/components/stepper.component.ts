import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { StepperStepsComponent } from './stepper-steps.component';
import { StepperDirectionComponent } from './stepper-direction.component';

@Component({
  selector: 'dss-stepper',
  imports: [CardComponent, StepperStepsComponent, StepperDirectionComponent],
  template: `
    <dss-card title="Stappen motor">
      <dss-stepper-steps/>
      <dss-stepper-direction/>
    </dss-card>
  `,
})
export class StepperComponent {
}
