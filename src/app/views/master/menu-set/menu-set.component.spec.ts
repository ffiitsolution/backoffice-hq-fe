import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSetComponent } from './menu-set.component';

describe('MenuSetComponent', () => {
  let component: MenuSetComponent;
  let fixture: ComponentFixture<MenuSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
