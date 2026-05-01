import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-magnets',
  imports: [NzButtonComponent, CardComponent, NzIconDirective],
  template: `
    <dss-card title="Schoenen">
      <div class="control">
        <button nz-button class="control-button" (mousedown)="leftOn()" (mouseup)="leftOff()">
          <nz-icon nzType="arrow-right"  nzRotate="135"/>
           links
        </button>
        <button nz-button class="control-button" (mousedown)="rightOn()" (mouseup)="rightOff()">
           rechts
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
