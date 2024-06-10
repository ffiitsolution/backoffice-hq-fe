import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, DatePipe, DecimalPipe } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './config/app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoginComponent } from './views/pages/login/login.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { DefaultFooterComponent } from './layout/default-layout/default-footer/default-footer.component';
import { DefaultHeaderComponent } from './layout/default-layout/default-header/default-header.component';
import { CoreModule } from './core/core.module';
import { IdleService } from './services/idle.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    IconModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    DatePipe,
    DecimalPipe,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
    IdleService
  ],
  exports: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
