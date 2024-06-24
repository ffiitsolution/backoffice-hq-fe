import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }


  getToken(): string | null {
    return localStorage.getItem('hq_token');
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('hq_token', token);
    } else {
      localStorage.removeItem('hq_token');
    }
  }

  headers(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let token = this.getToken();
    if (token !== null && token?.length > 0) {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('X-API-TOKEN', token);
    }
    return headers;
  }

  doPost(url: string = '', body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + url, body, {
      headers: this.headers(),
    });
  }

  listGlobal(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/dt', body, {
      headers: this.headers(),
    });
  }

  insertGlobal(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/insert', body, {
      headers: this.headers(),
    });
  }
  updateGlobal(body: any = {}): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/global/update', body);
  }

}
