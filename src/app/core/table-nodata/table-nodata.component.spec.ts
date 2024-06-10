import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNodataComponent } from './table-nodata.component';

describe('TableNodataComponent', () => {
  let component: TableNodataComponent;
  let fixture: ComponentFixture<TableNodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNodataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
