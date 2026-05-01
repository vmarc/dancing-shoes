import { Component } from '@angular/core';
import { input } from '@angular/core';
import { CardComponent } from './card.component';
import { Model } from '../../../model/model';
import { MotorComponent } from './motor.component';

@Component({
  selector: 'dss-motors',
  imports: [CardComponent, MotorComponent],
  template: `
    <dss-card title="Motoren">
      <dss-motor [motor]="model().motor1"/>
      <dss-motor [motor]="model().motor2"/>
      <dss-motor [motor]="model().motor3"/>
    </dss-card>
  `,
})
export class MotorsComponent {
  readonly model = input.required<Model>();
}
