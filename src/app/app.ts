import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './ui/components/toolbar.component';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <dss-toolbar/>
    <div class="content">
      <router-outlet/>
    </div>
  `,
  styles: `
    .content {
      margin: 0 1em 1em 1em;
    }
  `,
})
export class App {
}
