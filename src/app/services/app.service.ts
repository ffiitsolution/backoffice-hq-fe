import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

export enum AppServiceType {
  LIST_OUTLET,
  LIST_GLOBAL_CONDITION,
  LIST_GLOBAL,
  LIST_OUTLET_TYPE,
  LIST_REGION,
  LIST_AREA,
  LIST_ITEM_PRICE,
  LIST_MENU_GROUP,
  LIST_ITEM,
  LIST_GROUP_ITEM,
  LIST_RECIPE
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  get(type: AppServiceType, params: any, pathParam: string | null = null): Observable<any> {
    return this.httpClient.get(this.getUrl(type) + (pathParam ? `/${pathParam}` : ''), { params: params });
  }

  put(type: AppServiceType, body: any, pathParam: string | null = null): Observable<any> {
    return this.httpClient.put(this.getUrl(type) + (pathParam ? `/${pathParam}` : ''), body);
  }

  post(type: AppServiceType, body: any): Observable<any> {
    return this.httpClient.post(this.getUrl(type), body);
  }

  private getUrl(type: AppServiceType): string {
    let url = '';
    switch (type) {
      case AppServiceType.LIST_OUTLET:
        // url = this.BASE_URL + 'outlet/dt';
        url = 'http://172.16.9.127:8093/backofficeho/api/outlet/dt';
        break;
      case AppServiceType.LIST_GLOBAL_CONDITION:
        url = this.BASE_URL + '/list-cond-global';
        break;
      case AppServiceType.LIST_GLOBAL:
        url = this.BASE_URL + '/list-master-global';
        break;
      case AppServiceType.LIST_OUTLET_TYPE:
        url = this.BASE_URL + '/list-type-store';
        break;
      case AppServiceType.LIST_REGION:
        url = this.BASE_URL + '/list-region';
        break;
      case AppServiceType.LIST_AREA:
        url = this.BASE_URL + '/list-area';
        break;
      case AppServiceType.LIST_ITEM_PRICE:
        url = this.BASE_URL + '/list-item-price';
        break;
      case AppServiceType.LIST_MENU_GROUP:
        url = this.BASE_URL + '/list-menu-group';
        break;
      case AppServiceType.LIST_ITEM:
        url = this.BASE_URL + '/item';
        break;
      case AppServiceType.LIST_GROUP_ITEM:
        url = this.BASE_URL + '/menu-items';
        break;
      case AppServiceType.LIST_RECIPE:
        url = this.BASE_URL + '/recipe-header';
        break;
    }
    console.log(url);
    
    return url
  }
}
