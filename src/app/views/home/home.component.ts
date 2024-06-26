import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title: string = 'Dashboard';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  rangeDatePeriode: any;
  fromDate: any;
  toDate: any;
  dataSales = {
    labels: [''],
    datasets: [
      {
        label: '',
        backgroundColor: '#CCE2F7',
        data: [0],
      },
    ],
  };
  dataBill = this.dataSales;

  constructor(private appSvc: AppService) {}

  ngOnInit(): void {
    this.fromDate = moment().subtract(30, 'days');
    this.toDate = moment();
    this.rangeDatePeriode = [this.fromDate.format('YYYY-MM-DD'), this.toDate.format('YYYY-MM-DD')];
    console.log(this.rangeDatePeriode);
    this.fetchChartData();
  }

  fetchChartData(): void {
    const params = {
      startDate: this.fromDate.format('YYYY-MM-DD'),
      endDate: this.toDate.format('YYYY-MM-DD'),
    };
    this.appSvc.doPost('/dashboard/main-transaction-chart', params).subscribe({
      next: (response: any) => {
        let labels = response.data.map((item: any) =>
          this.formatDateWithDay(item.transDate)
        );
        this.dataSales = {
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              backgroundColor: '#CCE2F7',
              data: response.data.map((item: any) => item.totalSales),
            },
          ],
        };
        this.dataBill = {
          labels: labels,
          datasets: [
            {
              label: 'Total Bill',
              backgroundColor: '#DED2FD',
              data: response.data.map((item: any) => item.totalBill),
            },
          ],
        };
      },
      error: (error: any) => {
        console.error('Error fetching chart data', error);
      },
      complete: () => {
        // console.log('Fetching chart data completed.');
      },
    });
  }

  formatDateWithDay(dateString: string): string {
    const day = moment(dateString).format('dddd');
    return day.substring(0,3) + ' ' + dateString;
  }

  onChangePeriode(data: any) {
    if (data) {
      this.fromDate = moment(data[0]);
      this.toDate = moment(data[1]);
      this.fetchChartData();
    }
  }
}
