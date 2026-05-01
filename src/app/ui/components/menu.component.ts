import { Component } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dss-menu',
  template: `
    <ul nz-menu>
      <li nz-menu-item routerLink="/">
        <nz-icon nzType="home"/>
        <span>Start</span>
      </li>
      <li nz-menu-item routerLink="/arduino">
        <nz-icon nzType="api"/>
        <span>Arduino</span>
      </li>
      <li nz-menu-item routerLink="/xy">
        <nz-icon nzType="control"/>
        <span>XY Sturing</span>
      </li>
      <li nz-menu-item routerLink="/settings">
        <nz-icon nzType="setting"/>
        <span>Instellingen</span>
      </li>
    </ul>
  `,
  styles: `
    li nz-icon {
      margin-right: 1em;
    }
  `,
  imports: [
    NzIconDirective,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
  ],
})
export class MenuComponent {
}
