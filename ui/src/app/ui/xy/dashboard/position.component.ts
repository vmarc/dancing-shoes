import { Component } from '@angular/core';
import { input } from '@angular/core';
import { CardComponent } from './card.component';
import { Model } from '../../../model/model';

@Component({
  selector: 'dss-position',
  template: `
    <dss-card title="Positie">
      <div class="row">
        <div class="label">X</div>
        <div class="value">
          {{model().x()}}
        </div>
        <div class="unit">cm</div>
      </div>
      <div class="row">
        <div class="label">Y</div>
        <div class="value">
          {{model().y()}}
        </div>
        <div class="unit">cm</div>
      </div>
      <div class="row">
        <div class="label">Rotatie</div>
        <div class="value">
          {{model().rotation()}}
        </div>
        <div class="unit">°</div>
      </div>
    </dss-card>
  `,
  styles: `
    .row {
      display: flex;
      align-items: center;
    }

    .label {
      width: 6em;
    }

    .value {
      display: flex;
      justify-content: end;
      padding-left: 1em;
      width: 3em;
      border-bottom: 1px solid lightgray;
    }

    .unit {
      padding-left: 0.2em;
    }
  `,
  imports: [
    CardComponent,
  ],
})
export class PositionComponent {
  readonly model = input.required<Model>();
}
