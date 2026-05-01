import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { input } from '@angular/core';

@Component({
  selector: 'dss-xy-control-rotate',
  imports: [NzButtonComponent, NzIconDirective],
  template: `
    <div>{{ title() }} rotatie</div>
    <button nz-button>
      <nz-icon nzType="undo"/>
    </button>
    <button nz-button>
      <nz-icon nzType="redo"/>
    </button>
  `,
  styles: `
  `,
})
export class XyControlRotateComponent {
  title = input.required<string>();
}
