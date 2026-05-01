import { Component } from '@angular/core';
import { MagnetsComponent } from './components/magnets.component';
import { StepperComponent } from './components/stepper.component';
import { LedComponent } from './components/led.component';
import { ConnectionComponent } from './components/connection.component';
import { ToolbarComponent } from '../components/toolbar.component';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dss-control',
  imports: [
    LedComponent,
    MagnetsComponent,
    StepperComponent,
    ConnectionComponent,
  ],
  template: `
    <div class="control">
      <dss-connection class="small"/>
      <dss-led class="small"/>
      <dss-magnets class="small"/>
      <dss-stepper class="small"/>
    </div>
  `,
  styles: `
    .control {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .small {
      width: 20em;
    }
  `,
})
export class ControlComponent {
  private readonly title = inject(Title);
  constructor() {
    this.title.setTitle("Arduino");
  }
}
