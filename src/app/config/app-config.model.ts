/**
 * Created by Restu B. Apit on 02/06/2023
 */

export interface IAppConfig {
  env: {
    name: string;
  };
  apiServer: {
    TRANSACTION_SERVICE_BASE_URL: string;
    PETTYCASH_SERVICE_BASE_URL: string;
    MASTER_SERVICE_BASE_URL: string;
    MASTER_SERVICE: string;
    BI_KFC_SERVICE_BASE_URL: string;
  };
  applicationTitle: string;
  applicationSubtitle: string;
  outletCode: string;

}
