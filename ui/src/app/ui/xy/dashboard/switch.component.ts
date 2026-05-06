import { Component } from '@angular/core';
import { input } from '@angular/core';
import { SwitchIndicatorComponent } from '../../components/switch-indicator.component';

@Component({
  selector: 'dss-switch',
  template: `
    <div class="switch">
      <dss-switch-indicator [value]="value()"/>
      <div>{{ label() }}</div>
    </div>
  `,
  styles: `
    .switch {
      display: flex;
      margin-right: 2em;
      align-items: anchor-center;
      gap: 0.3em;
    }
  `,
  imports: [
    SwitchIndicatorComponent
  ],
})
export class SwitchComponent {
  readonly label = input.required<string>();
  readonly value = input.required<boolean>();
}
