import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";

  user: any;
  date: Date = new Date;
  outletData: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.auth.getUser();    
  }

  logout() {
    this.auth.doLogout();
    this.router.navigate(['/login']);
  }
}
