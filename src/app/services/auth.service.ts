import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }
  
  doLogin(username: any, password: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/login', {
      userName: username,
      password: password,
      outletCode: '0208'
    });
  }

  doLogout() {
    localStorage.clear();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLoggednIn() {
    const isObjectEmpty = (object: any) => {
      return Object.keys(object).length === 0;
    }
    const user = this.getUser();
    return isObjectEmpty(user) ? false : true;
  }
}
