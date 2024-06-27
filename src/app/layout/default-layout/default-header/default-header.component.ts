import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

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
  isOnline: boolean = false;
  willGoOffline: number = 0;

  constructor(
    private auth: AuthService,
    private websocketService: WebsocketService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.websocketService.registerFunction('WS_SUBSCRIBE_HEADER', () => {
      this.doSubscribe();
    });
    this.checkServerTime();
  }

  doSubscribe() {
    this.websocketService.subscribe('/topic/serverTime', (message: string) => {
      this.isOnline = true;
      this.willGoOffline = 2;
      const data = JSON.parse(message);
      localStorage.setItem('boffihq_serverTime', data.serverTime ?? 'OFFLINE');
      localStorage.setItem('boffihq_beVersion', data.beVersion ?? 'OFFLINE');
    });
  }

  ngOnDestroy() {
    this.websocketService.unsubscribe('/topic/serverTime');
  }

  checkServerTime() {
    setInterval(() => {
      if (this.willGoOffline > 0) {
        this.willGoOffline--;
      } else {
        this.isOnline = false;
      }
    }, 1000);
  }

  logout() {
    this.auth.doLogout();
    this.router.navigate(['/login']);
  }
}
