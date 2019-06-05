import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentsComponent } from './intake-moments.component';

describe('IntakeMomentsComponent', () => {
  let component: IntakeMomentsComponent;
  let fixture: ComponentFixture<IntakeMomentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeMomentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeMomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
