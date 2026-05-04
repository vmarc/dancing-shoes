import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NoFocusDirective } from '../../components/nofocus.directive';

@Component({
  selector: 'dss-xy-control-move',
  template: `
    <div>
      Verplaatsing
    </div>

    <div class="buttons">
      <button nz-button>
        <nz-icon nzType="arrow-up" nzRotate="-45"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-up"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-up" nzRotate="45"/>
      </button>

      <button nz-button>
        <nz-icon nzType="arrow-left"/>
      </button>
      <button nz-button>
        <nz-icon nzType="fullscreen-exit"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-right"/>
      </button>

      <button nz-button>
        <nz-icon nzType="arrow-down" nzRotate="45"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-down"/>
      </button>
      <button nz-button>
        <nz-icon nzType="arrow-down" nzRotate="-45"/>
      </button>
    </div>
  `,
  styles: `
    .buttons {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 0.3em;
    }
  `,
  imports: [
    NoFocusDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
})
export class XyControlMoveComponent {
}
