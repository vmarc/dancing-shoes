import { Component } from '@angular/core';
import { input } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzDropdownDirective } from 'ng-zorro-antd/dropdown';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MenuComponent } from './menu.component';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dss-toolbar',
  imports: [
    NzDropdownMenuComponent,
    NzDropdownDirective,
    NzIconDirective,
    NzButtonComponent,
    MenuComponent
  ],
  template: `
    <div class="toolbar">
      <button nz-button class="menu" nz-dropdown nzTrigger="click" [nzDropdownMenu]="menu">
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
    }
    .menu {
      margin: 1em;
    }
  `,
})
export class ToolbarComponent {
  title = inject(Title);
  // title = input.required<string>();
}
