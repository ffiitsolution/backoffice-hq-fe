import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

export enum AppType {
  LIST_OUTLET
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  protected config = AppConfig.settings.apiServer;

  constructor(
    private httpClient: HttpClient
  ) { }

  listGlobalCondition(params: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-cond-global', params);
  }

  listGlobal(param: any): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-master-global', param);
  }

  listOutlet(param: any): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-outlet', param);
  }

  listTypeOutlet(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-type-store', param);
  }

  listRegion(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-region', param);
  }

  listArea(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-area', param);
  }

  listItemPrice(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-item-price', param);
  }

  listMenuGroup(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/list-menu-group', param);
  }

  listItem(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/item', param);
  }

  listGroupItem(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/menu-items', param);
  }

  listRecipe(param: any = {}): Observable<any> {
    return this.httpClient.post(this.config.TRANSACTION_SERVICE_BASE_URL + '/recipe-header', param);
  }

  get(type: AppType, params: any): Observable<any> {
    return this.httpClient.get(this.getUrl(type), params);
  }

  put(type: AppType, params: any): Observable<any> {
    return this.httpClient.put(this.getUrl(type), params);
  }

  post(type: AppType, params: any): Observable<any> {
    return this.httpClient.post(this.getUrl(type), params);
  }

  private getUrl(type: AppType): string {
    let url = '';
    switch (type) {
      case AppType.LIST_OUTLET:
        // url = this.config.TRANSACTION_SERVICE_BASE_URL + 'outlet/dt';
        url = 'http://172.16.9.127:8093/backofficeho/api/outlet/dt';
        break;
    }
    return url
  }
}
