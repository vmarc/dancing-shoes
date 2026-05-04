import { Component } from '@angular/core';
import { CardComponent } from '../../xy/dashboard/card.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { inject } from '@angular/core';
import { ArduinoService } from '../../../arduino/arduino.service';
import { NoFocusDirective } from '../../components/nofocus.directive';
import { NzButtonComponent } from 'ng-zorro-antd/button';

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
    NoFocusDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
})
export class LedComponent {
  private readonly service = inject(ArduinoService);

  on(): void {
    this.service.ledOn();
  }

  off(): void {
    this.service.ledOff();
  }
}
