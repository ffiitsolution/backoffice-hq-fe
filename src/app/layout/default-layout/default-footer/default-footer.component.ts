import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss']
})
export class DefaultFooterComponent extends FooterComponent {
  year: any = (new Date()).getFullYear();
  version: string = environment.VERSION;
  constructor() { 
    super();
  }
}
