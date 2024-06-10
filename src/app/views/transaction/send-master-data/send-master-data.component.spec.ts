import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMasterDataComponent } from './send-master-data.component';

describe('SendMasterDataComponent', () => {
  let component: SendMasterDataComponent;
  let fixture: ComponentFixture<SendMasterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMasterDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
