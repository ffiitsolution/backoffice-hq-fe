import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss']
})
export class BtnActionComponent {
  @Output()
  emitter = new Subject<IDemoNgComponentEventType>();

  @Input()
  data = {};

  ngOnInit(): void { }

  onAction1() {
    this.emitter.next({
      cmd: "action1",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}

export interface IDemoNgComponentEventType {
  cmd: string;
  data: any;
}