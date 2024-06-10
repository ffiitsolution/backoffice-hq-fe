import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LogComponent } from './log/log.component';
import { HqComponent } from './hq/hq.component';

@NgModule({
  declarations: [
    LogComponent,
    HqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule { }
