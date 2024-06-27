import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendMasterDataComponent } from './send-master-data/send-master-data.component';
import { ReceiveTransactionDataComponent } from './receive-transaction-data/receive-transaction-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DashboardComponent,
    SendMasterDataComponent,
    ReceiveTransactionDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    CoreModule
  ]
})
export class TransactionModule { }
