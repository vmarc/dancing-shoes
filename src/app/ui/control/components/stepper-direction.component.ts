import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-stepper-direction',
  imports: [NzButtonComponent, NzIconDirective],
  template: `
    <div>Richting</div>
    <div class="buttons">
      <button nz-button (click)="backward()">
        <nz-icon nzType="arrow-left"/>
      </button>
      <button nz-button (click)="forward()">
        <nz-icon nzType="arrow-right"/>
      </button>
    </div>
  `,
  styles: `
    .buttons {
      display: flex;
      flex-direction: row;
      margin: 1em;
      gap: 0.5em;
    }
  `,
})
export class StepperDirectionComponent {

  backward(): void {
    console.log("CONTROL STEPPER BACKWARD");
  }

  forward(): void {
    console.log("CONTROL STEPPER FORWARD");
  }
}
