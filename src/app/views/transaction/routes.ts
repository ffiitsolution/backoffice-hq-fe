import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendMasterDataComponent } from './send-master-data/send-master-data.component';
import { ReceiveTransactionDataComponent } from './receive-transaction-data/receive-transaction-data.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Transaction Dashboard'
    }
  },
  {
    path: 'send-master-data',
    component: SendMasterDataComponent,
    data: {
      title: 'Kirim Data Master'
    }
  },
  {
    path: 'receive-transaction-data',
    component: ReceiveTransactionDataComponent,
    data: {
      title: 'Terima Data Transaksi'
    }
  }
];