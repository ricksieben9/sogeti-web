import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentsReceiverComponent } from './intake-moments-receiver.component';

describe('IntakeMomentsReceiverComponent', () => {
  let component: IntakeMomentsReceiverComponent;
  let fixture: ComponentFixture<IntakeMomentsReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeMomentsReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeMomentsReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
