import { Component } from '@angular/core';
import { input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dss-switch-indicator',
  imports: [FormsModule],
  template: `
    <div class="switch" [class.on]="value()" [class.off]="!value()"></div>
  `,
  styles: `
    .switch {
      width: 1em;
      height: 1em;
      border: 1px solid black;
    }

    .on {
      background-color: red;
    }

    .off {
      background-color: lightgray;
    }
  `,
})
export class SwitchIndicatorComponent {
  readonly value = input.required<boolean>();
}
