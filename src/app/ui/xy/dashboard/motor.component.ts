import { Component } from '@angular/core';
import { input } from '@angular/core';
import { DegreesComponent } from '../../components/degrees.component';
import { Motor } from '../../../model/motor';

@Component({
  selector: 'dss-motor',
  imports: [DegreesComponent],
  template: `
    <div class="row">
      <div class="label">{{motor().label}}</div>
      <dss-degrees [degrees]="motor().degrees()"/>
      <div class="rotation-degrees">
        {{motor().degrees()}}°
      </div>
      <div class="steps">
        150/200 stappen
      </div>
      <div class="progress">
        75%
      </div>
    </div>
  `,
  styles: `
    .row {
      display: flex;
      align-items: center;
      padding-top: 0.5em;
      padding-top: 0.5em;
    }

    .label {
      width: 6em;
    }

    .rotation-degrees {
      display: flex;
      justify-content: end;
      padding-left: 1em;
      width: 4em;
    }

    .steps {
      display: flex;
      justify-content: end;
      width: 10em;
    }

    .progress {
      display: flex;
      justify-content: end;
      width: 4em;
    }
  `,
})
export class MotorComponent {
  readonly motor = input.required<Motor>();
}
