import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from './app-config.model';
import { map } from "rxjs/operators";

@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  constructor(private http: HttpClient) {}
  load() {
    const jsonFile = './assets/config/config.' + environment.name + '.json';
    return new Promise<void>((resolve, reject) => {
    this.http
              .get(jsonFile)
              .toPromise()
              .then((response: any) => {
                  AppConfig.settings = <IAppConfig> response;
                  resolve();
              })
              .catch((response: any) => {
                  reject(
                      `Could not load app configuration file '${jsonFile}': ${JSON.stringify(
                          response
                      )}`
                  )
              })
    });
  }
}
