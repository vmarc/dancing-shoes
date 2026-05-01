import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { PathComponent } from './path/path.component';
import { ModelService } from '../../model/model.service';
import { ArduinoService } from '../../arduino/arduino.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { XyControlComponent } from './control/xy-control.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dss-xy',
  imports: [DashboardComponent, PathComponent, XyControlComponent],
  template: `
    <div class="page">
      <dss-xy-control/>
      <dss-path [model]="model"/>
      <dss-dashboard [model]="model"/>
    </div>
  `,
  styles: `
    .page {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    dss-xy-control {
      width: 20em;
    }
  `,
})
export class XYComponent {
  private readonly title = inject(Title);
  private readonly modelService = inject(ModelService);
  private readonly arduinoService = inject(ArduinoService);
  readonly model = this.modelService.model;
  constructor() {
    this.title.setTitle("XY Sturing");
  }
}

