import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveTransactionDataComponent } from './receive-transaction-data.component';

describe('ReceiveTransactionDataComponent', () => {
  let component: ReceiveTransactionDataComponent;
  let fixture: ComponentFixture<ReceiveTransactionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveTransactionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveTransactionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
