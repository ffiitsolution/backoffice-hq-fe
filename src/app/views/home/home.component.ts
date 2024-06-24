import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title: string = 'Dashboard';

  constructor(private appSvc: AppService) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };

  fetchChartData(): void {
    this.appSvc.doPost('/menu/param/outlet').subscribe({
      next: (response: any) => {
        // this.lineChartData = [{
        //   data: response.data.map((item: any) => item.value),
        //   label: 'GitHub Commits'
        // }];
        // this.lineChartLabels = response.data.map((item: any) => item.label);
      },
      error: (error: any) => {
        console.error('Error fetching chart data', error);
      },
      complete: () => {
        console.log('Fetching chart data completed.');
      }
    });
  }
}
