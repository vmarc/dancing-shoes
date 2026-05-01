import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-connection',
  imports: [NzButtonComponent, CardComponent, NzIconDirective],
  template: `
    <dss-card title="Verbinding">
      <div class="control">
        <button nz-button class="control-button" (click)="on()">
          <nz-icon nzType="login"/>
           start
        </button>
        <button nz-button class="control-button" (click)="off()">
          <nz-icon nzType="stop"/>
           stop
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
export class ConnectionComponent {

  on(): void {
    console.log("CONTROL LED ON");
  }

  off(): void {
    console.log("CONTROL LED OFF");
  }
}
