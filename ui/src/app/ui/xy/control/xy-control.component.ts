import { Component } from '@angular/core';
import { CardComponent } from '../dashboard/card.component';
import { XyControlMoveComponent } from './xy-control-move.component';
import { XyControlRotateComponent } from './xy-control-rotate.component';

// see https://samcooksey.github.io/corexy-playground/
@Component({
  selector: 'dss-xy-control',
  template: `
    <dss-card title="XY instructies">
      <div class="contents">
        <dss-xy-control-move/>
        <div class="rotate">
          <dss-xy-control-rotate title="XY-1"/>
          <dss-xy-control-rotate class="xy-2" title="XY-2"/>
        </div>
      </div>
    </dss-card>
  `,
  styles: `
    .contents {
      display: inline-grid;
      grid-template-columns: auto auto;
      gap: 2rem;
    }
    .rotate {
      display: inline-grid;
      grid-template-columns: auto;
      grid-template-rows: 1fr 1fr;
    }

    .xy-2 {
      align-self: end;
    }
  `,
  imports: [
    CardComponent,
    XyControlMoveComponent,
    XyControlRotateComponent,
  ],
})
export class XyControlComponent {
}
