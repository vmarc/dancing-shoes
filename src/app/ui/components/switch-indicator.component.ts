import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'dss-switch-indicator',
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
