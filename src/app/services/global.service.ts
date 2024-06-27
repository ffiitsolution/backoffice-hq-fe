import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private functions: { [key: string]: () => void } = {};
  data: any;
  params: any;
  args: any;
  type: any;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
  }

  swal = Swal;
  service = this.appService;
  auth = this.authService;
  toastr = this.toastrService;

  //
  swalBtnConfirmColor: '#B51823';
  swalBtnCancelColor: '#535361';



  generateDateRange(startDate: string, endDate: string): string[] {
    // date format = '2024-07-01'
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange: string[] = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dateRange.push(dt.toISOString().split('T')[0]);
    }

    return dateRange;
  }

  registerFunction(key: string, func: () => void): void {
    this.functions[key] = func;
  }

  executeFunction(key: string): void {
    const func = this.functions[key];
    if (func) {
      func();
    } else {
      console.error(`No function registered with key: ${key}`);
    }
  }
}
