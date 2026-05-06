import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { input } from '@angular/core';

@Component({
  selector: 'dss-xy-control-rotate',
  template: `
    <div>{{ title() }} rotatie</div>
    <div class="buttons">
      <button nz-button>
        <nz-icon nzType="undo"/>
      </button>
      <button nz-button>
        <nz-icon nzType="redo"/>
      </button>
    </div>
  `,
  styles: `
    .buttons {
      display: grid;
      grid-template-columns: auto auto;
    }
  `,
  imports: [
    NzButtonComponent,
    NzIconDirective
  ],
})
export class XyControlRotateComponent {
  title = input.required<string>();
}
