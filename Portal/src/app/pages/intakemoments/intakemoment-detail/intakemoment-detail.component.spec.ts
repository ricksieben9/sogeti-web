import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakemomentDetailComponent } from './intakemoment-detail.component';

describe('IntakemomentDetailComponent', () => {
  let component: IntakemomentDetailComponent;
  let fixture: ComponentFixture<IntakemomentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakemomentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakemomentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
