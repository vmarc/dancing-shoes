import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'dss-card',
  template: `
    <div class="card">
      <div class="card-title">{{ title() }}</div>
      <div class="card-content">
        <ng-content/>
      </div>
    </div>
  `,
  styles: `
    .card {
      border: 1px solid gray;
    }

    .card-title {
      padding: 0.3em 0.3em 0.3em 0.5em;
      border-bottom: 1px solid #aaaaaa;
      background-color: #f8f8f8;
    }

    .card-content {
      padding: 0.5em 0.5em 0.5em 0.5em;
    }
  `,
})
export class CardComponent {
  readonly title = input.required<string>();
}
