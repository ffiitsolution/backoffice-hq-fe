/**
 * Created by Restu B. Apit on 02/06/2023
 */

export interface IAppConfig {
  env: {
    name: string;
  };
  apiServer: {
    BASE_URL: string;
  };
  applicationTitle: string;
  applicationSubtitle: string;
  outletCode: string;
}
