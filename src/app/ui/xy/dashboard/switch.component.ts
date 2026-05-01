import { Component } from '@angular/core';
import { input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchIndicatorComponent } from '../../components/switch-indicator.component';

@Component({
  selector: 'dss-switch',
  imports: [FormsModule, SwitchIndicatorComponent],
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
})
export class SwitchComponent {
  readonly label = input.required<string>();
  readonly value = input.required<boolean>();
}
