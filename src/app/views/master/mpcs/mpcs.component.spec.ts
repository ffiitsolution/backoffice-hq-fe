import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcsComponent } from './mpcs.component';

describe('MpcsComponent', () => {
  let component: MpcsComponent;
  let fixture: ComponentFixture<MpcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpcsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
