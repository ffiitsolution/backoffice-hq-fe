import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  title: string = 'Dashboard Master';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  rangeDatePeriode: any;
  fromDate: any;
  toDate: any;
  today: any;
  indexToday: number;
  isLoadingTable: boolean = false;
  transformedData: any;
  constructor(private g: GlobalService) {}

  ngOnInit(): void {
    this.fromDate = moment().subtract(7, 'days');
    this.toDate = moment().add(14, 'days');
    this.today = moment().format('YYYY-MM-DD');
    this.rangeDatePeriode = [this.fromDate.toDate(), this.toDate.toDate()];
    this.fetchChartData();
  }

  fetchChartData(): void {
    const params = {
      startDate: this.fromDate.format('YYYY-MM-DD'),
      endDate: this.toDate.format('YYYY-MM-DD'),
    };
    if (!this.isLoadingTable) {
      this.isLoadingTable = true;
      this.g.service.doPost('/master/dashboard/main-table', params).subscribe({
        next: (response: any) => {
          const dateRange = this.g.generateDateRange(
            params.startDate,
            params.endDate
          );
          let t = this.transformData(response?.data ?? [], dateRange);
          console.log(t);
          this.transformedData = t;
        },
        error: (error: any) => {
          console.error('Error fetching chart data', error);
        },
        complete: () => {
          this.isLoadingTable = false;
        },
      });
    }
  }

  transformData(data: any, dateRange: string[]): any {
    this.indexToday = dateRange.indexOf(this.today);

    const stores = Array.from(
      new Set(data.map((item: any) => item.outletName))
    ).map((name: any) => {
      return {
        name,
        code: data.find((item: any) => item.outletName === name).outletCode,
      };
    });

    const tableData = stores.map((store) => {
      const dateStatuses = dateRange.map((date) => {
        const statuses = data
          .filter(
            (item: any) =>
              item.outletName === store.name && item.dateUpd === date
          )
          .map((item: any) => item.status);

        if (statuses.length === 0) {
          return '-';
        }

        const allSuccess = statuses.every((status) => status === 'A');
        const allFailed = statuses.every((status) => status === 'I');

        if (allSuccess) {
          return 'A';
        } else if (allFailed) {
          return 'I';
        } else {
          return '-';
        }
      });

      return {
        name: store.name,
        code: store.code,
        statuses: dateStatuses,
      };
    });

    // console.log({ stores, dates: dateRange, tableData });

    return { stores, dates: dateRange, tableData };
  }

  formatDateWithDayMonth(dateString: string): string {
    return moment(dateString).format('DD');
  }

  onChangePeriode(data: any) {
    if (data) {
      this.fromDate = moment(data[0]);
      this.toDate = moment(data[1]);
      this.fetchChartData();
    }
  }
}
