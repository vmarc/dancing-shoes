import { Component } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzDropdownDirective } from 'ng-zorro-antd/dropdown';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MenuComponent } from './menu.component';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dss-toolbar',
  template: `
    <div class="toolbar">
      <button nz-button nz-dropdown nzTrigger="click" [nzDropdownMenu]="menu">
        <nz-icon nzType="menu"/>
      </button>
      <h1>{{title.getTitle()}}</h1>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <dss-menu/>
      </nz-dropdown-menu>
    </div>
  `,
  styles: `
    .toolbar {
      display: flex;
      align-items: center;
      margin: 1em;
    }
    .toolbar h1 {
      margin-left: 1em;
    }
  `,
  imports: [
    MenuComponent,
    NzButtonComponent,
    NzDropdownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
  ],
})
export class ToolbarComponent {
  title = inject(Title);
}
