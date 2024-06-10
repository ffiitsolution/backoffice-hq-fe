import { Routes } from '@angular/router';
import { LogComponent } from './log/log.component';
import { HqComponent } from './hq/hq.component';

export const routes: Routes = [
  {
    path: 'hq',
    component: HqComponent,
    data: {
      title: 'Report HQ'
    }
  },
  {
    path: 'log',
    component: LogComponent,
    data: {
      title: 'Report Log'
    }
  }
];