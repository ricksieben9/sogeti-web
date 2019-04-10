import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensersComponent } from './dispensers.component';

describe('DispensersComponent', () => {
  let component: DispensersComponent;
  let fixture: ComponentFixture<DispensersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
