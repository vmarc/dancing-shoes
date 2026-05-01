import { Component } from '@angular/core';
import { input } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-degrees',
  template: `
    <div class="degrees">
      <nz-icon class="degrees-icon" [nzRotate]="degrees()" nzType="arrow-up"/>
    </div>
  `,
  styles: `
    .degrees {
      display: flex;
      justify-content: center;
      padding: 0.5em;
      border-radius: 50%;
      border: 1px solid black;
      background-color: powderblue;
    }
    .degrees-icon {
      color: blue;
    }
  `,
  imports: [
    NzIconDirective
  ],
})
export class DegreesComponent {
  readonly degrees = input.required<number>();
}
