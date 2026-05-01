import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-led',
  template: `
    <dss-card title="LED">
      <div class="control">
        <button nz-button class="control-button" (click)="on()">
          <nz-icon nzType="plus-circle"/>
          <span>aan</span>
        </button>
        <button nz-button class="control-button" (click)="off()">
          <nz-icon nzType="minus-circle"/>
          <span>uit</span>
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
export class LedComponent {

  on(): void {
    console.log("CONTROL LED ON");
  }

  off(): void {
    console.log("CONTROL LED OFF");
  }
}
