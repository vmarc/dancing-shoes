import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-magnets',
  template: `
    <dss-card title="Schoenen">
      <div class="control">
        <button nz-button class="control-button" (mousedown)="leftOn()" (mouseup)="leftOff()">
          <nz-icon nzType="arrow-right"  nzRotate="135"/>
          <span> links</span>
        </button>
        <button nz-button class="control-button" (mousedown)="rightOn()" (mouseup)="rightOff()">
          <span>rechts</span>
          <nz-icon nzType="arrow-right" nzRotate="45"/>
        </button>
      </div>
    </dss-card>
  `,
  styles: `
    .control {
      display: flex;
      gap: 0.5em;
    }
  `,
  imports: [
    CardComponent,
    NzButtonComponent,
    NzIconDirective
  ],
})
export class MagnetsComponent {

  leftOn(): void {
    console.log("CONTROL LEFT ON");
  }

  leftOff(): void {
    console.log("CONTROL LEFT OFF");
  }

  rightOn(): void {
    console.log("CONTROL RIGHT ON");
  }

  rightOff(): void {
    console.log("CONTROL RIGHT OFF");
  }
}
