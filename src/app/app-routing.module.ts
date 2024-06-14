import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'master',
        loadChildren: () => import('./views/master/master.module').then((m) => m.MasterModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./views/transaction/transaction.module').then((m) => m.TransactionModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./views/report/report.module').then((m) => m.ReportModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
