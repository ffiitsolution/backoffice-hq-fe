import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private userActivityEvents$ = merge(
    fromEvent(window, 'mousemove'),
    fromEvent(window, 'scroll'),
    fromEvent(window, 'keydown'),
    fromEvent(window, 'click')
  );
  private userInactive: Subject<any> = new Subject();

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
    this.userInactive.subscribe(() => this.logout());
  }

  private startWatching() {    
    this.ngZone.runOutsideAngular(() => {
      this.userActivityEvents$
        .pipe(
          switchMap(() => {
            return timer(3600000).pipe(
              tap(() => this.userInactive.next(undefined))
            );
          })
        )
        .subscribe();
    });
  }

  private logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
