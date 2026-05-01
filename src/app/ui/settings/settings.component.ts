import { Component } from '@angular/core';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dss-settings',
  template: `
    <label nz-checkbox nzChecked="true">Arduino enabled</label>
  `,
  imports: [
    NzCheckboxComponent
  ],
})
export class SettingsComponent {
  private readonly title = inject(Title);
  constructor() {
    this.title.setTitle("Instellingen");
  }
}
