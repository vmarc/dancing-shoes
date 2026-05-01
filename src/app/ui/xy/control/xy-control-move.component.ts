import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-xy-control-move',
  imports: [NzButtonComponent, NzIconDirective],
  template: `
    <div>
      Verplaatsing
    </div>

    <div>
      <button nz-button>
        <nz-icon nzType="arrow-up" nzRotate="-45"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-up"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-up" nzRotate="45"/>
      </button>
    </div>

    <div>
      <button nz-button>
        <nz-icon nzType="arrow-left" nzRotate="-45"/>
      </button>
      <button nz-button>
        <nz-icon nzType="fullscreen-exit"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-right" nzRotate="45"/>
      </button>
    </div>

    <div>
      <button nz-button>
        <nz-icon nzType="arrow-down" nzRotate="-45"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-down"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-down" nzRotate="45"/>
      </button>
    </div>
  `,
  styles: `
  `,
})
export class XyControlMoveComponent {
}
