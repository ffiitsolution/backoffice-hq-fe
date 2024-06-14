import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

export enum AppServiceType {
  MASTER_OUTLET,
  MASTER_GLOBAL_CONDITION,
  MASTER_GLOBAL,
  MASTER_OUTLET_TYPE,
  MASTER_REGION,
  MASTER_AREA,
  MASTER_ITEM_PRICE,
  MASTER_MENU_GROUP,
  MASTER_ITEM,
  MASTER_GROUP_ITEM,
  MASTER_RECIPE
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

  post(type: AppServiceType, body: any, pathParam: string | null = null): Observable<any> {
    return this.httpClient.post(this.getUrl(type) + (pathParam ? `/${pathParam}` : ''), body);
  }

  private getUrl(type: AppServiceType): string {
    let url = '';
    switch (type) {
      case AppServiceType.MASTER_OUTLET:
        // url = this.BASE_URL + 'outlet/dt';
        url = 'http://172.16.9.127:8093/backofficeho/api/outlet/dt';
        break;
      case AppServiceType.MASTER_GLOBAL_CONDITION:
        url = this.BASE_URL + '/list-cond-global';
        break;
      case AppServiceType.MASTER_GLOBAL:
        url = this.BASE_URL + '/global';
        break;
      case AppServiceType.MASTER_OUTLET_TYPE:
        url = this.BASE_URL + '/list-type-store';
        break;
      case AppServiceType.MASTER_REGION:
        url = this.BASE_URL + '/list-region';
        break;
      case AppServiceType.MASTER_AREA:
        url = this.BASE_URL + '/list-area';
        break;
      case AppServiceType.MASTER_ITEM_PRICE:
        url = this.BASE_URL + '/list-item-price';
        break;
      case AppServiceType.MASTER_MENU_GROUP:
        url = this.BASE_URL + '/list-menu-group';
        break;
      case AppServiceType.MASTER_ITEM:
        url = this.BASE_URL + '/item';
        break;
      case AppServiceType.MASTER_GROUP_ITEM:
        url = this.BASE_URL + '/menu-items';
        break;
      case AppServiceType.MASTER_RECIPE:
        url = this.BASE_URL + '/recipe-header';
        break;
    }
    console.log(url);
    
    return url
  }
}
