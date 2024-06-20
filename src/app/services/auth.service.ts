import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private appService: AppService
  ) { }

  doLogin(username: any, password: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/auth/login', {
      staffCode: username,
      password: password
    });
  }

  doLogout() {
    localStorage.clear();
    this.appService.setToken(null);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('hq_user') || '{}');
  }

  setUser(user: any) {
    localStorage.setItem('hq_user', JSON.stringify(user));
  }

  isLoggednIn() {
    const isObjectEmpty = (object: any) => {
      return Object.keys(object).length === 0;
    }
    const user = this.getUser();
    return isObjectEmpty(user) ? false : true;
  }
}
