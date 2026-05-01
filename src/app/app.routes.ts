import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { ControlComponent } from './ui/control/control.component';
import { SettingsComponent } from './ui/settings/settings.component';
import { XYComponent } from './ui/xy/xy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'arduino',
    component: ControlComponent,
  },
  {
    path: 'xy',
    component: XYComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
