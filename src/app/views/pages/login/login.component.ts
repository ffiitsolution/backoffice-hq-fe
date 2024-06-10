import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { AppConfig } from '../../../config/app.config';
import * as _ from 'lodash';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userNameInput')
  userNameInput: ElementRef;

  @ViewChild('userPasswordInput')
  userPasswordInput: ElementRef;

  username: string;
  password: string;

  version: string = environment.VERSION;
  appTitle = AppConfig.settings.applicationTitle;
  appSubtitle = AppConfig.settings.applicationSubtitle;
  env = AppConfig.settings.env.name;
  year: number;

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authSvc: AuthService,
  ) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.authSvc.doLogout();
  }

  doLogin(): void {
    this.isLoading = true;
    this.authSvc.doLogin(this.username, this.password).pipe(finalize(() => this.isLoading = false)).subscribe(response => {
      const success = response?.success || false;
      this.errorMessage = success ? '' : response?.message;
      if (success) {
        const user = response?.item[0];
        this.authSvc.setUser(user);
        this.router.navigate(['/home']);
      }
    });
  }
}
