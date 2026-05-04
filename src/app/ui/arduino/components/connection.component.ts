import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ArduinoService } from '../../../arduino/arduino.service';
import { inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NoFocusDirective } from '../../components/nofocus.directive';

@Component({
  selector: 'dss-connection',
  template: `
    <dss-card title="Verbinding">
      <div class="control">
        <button nz-button class="control-button" (click)="init()">
          <nz-icon nzType="login"/>
          <span>start</span>
        </button>
        <button nz-button class="control-button" (click)="destroy()">
          <nz-icon nzType="stop"/>
          <span>stop</span>
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
    NoFocusDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
})
export class ConnectionComponent {
  private readonly service = inject(ArduinoService);

  init(): void {
    this.service.init();
  }

  destroy(): void {
    this.service.destroy();
  }
}
