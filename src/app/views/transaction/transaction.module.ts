import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendMasterDataComponent } from './send-master-data/send-master-data.component';
import { ReceiveTransactionDataComponent } from './receive-transaction-data/receive-transaction-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SendMasterDataComponent,
    ReceiveTransactionDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule
  ]
})
export class TransactionModule { }
