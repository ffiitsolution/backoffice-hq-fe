import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  listGlobalCondition(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/dt', body);
  }

  listGlobal(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/dt', body);
  }

  insertGlobal(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/insert', body);
  }

}
