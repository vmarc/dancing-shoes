import { Component } from '@angular/core';
import { input } from '@angular/core';
import { CardComponent } from './card.component';
import { Model } from '../../../model/model';
import { SwitchComponent } from './switch.component';

@Component({
  selector: 'dss-switches',
  imports: [CardComponent, SwitchComponent],
  template: `
    <dss-card title="Limit switches">
      <div class="row">
        <div class="label">X-as</div>
        <dss-switch label="X1" [value]="model().limitSwitchX1()"/>
        <dss-switch label="X2" [value]="model().limitSwitchX2()"/>
      </div>
      <div class="row">
        <div class="label">Y-as</div>
        <dss-switch label="Y1" [value]="model().limitSwitchY1()"/>
        <dss-switch label="Y2" [value]="model().limitSwitchY2()"/>
      </div>
      <div class="row">
        <div class="label">Rotatie</div>
        <dss-switch label="R1" [value]="model().limitSwitchR1()"/>
        <dss-switch label="R2" [value]="model().limitSwitchR2()"/>
      </div>
    </dss-card>
  `,
  styles: `
    .row {
      display: flex;
    }

    .label {
      width: 6em;
    }
  `,
})
export class SwitchesComponent {
  readonly model = input.required<Model>();
}
