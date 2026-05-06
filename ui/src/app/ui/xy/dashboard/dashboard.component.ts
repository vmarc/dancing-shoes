import { Component } from '@angular/core';
import { input } from '@angular/core';
import { MotorsComponent } from './motors.component';
import { PositionComponent } from './position.component';
import { SwitchesComponent } from './switches.component';
import { Model } from '../../../model/model';

@Component({
  selector: 'dss-dashboard',
  template: `
    <div class="dashboard-container">
      <dss-position [model]="model()"/>
      <dss-switches [model]="model()"/>
      <dss-motors [model]="model()"/>
    </div>
  `,
  styles: `
    .dashboard-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
    }

    dss-position {
      width: 20em;
    }

    dss-switches {
      width: 20em;
    }

    dss-motors {
      width: 41em;
    }
  `,
  imports: [
    MotorsComponent,
    PositionComponent,
    SwitchesComponent
  ]
})
export class DashboardComponent {
  readonly model = input.required<Model>();
}
