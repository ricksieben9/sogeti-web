import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentDetailComponent } from './intake-moment-detail.component';

describe('IntakeMomentDetailComponent', () => {
  let component: IntakeMomentDetailComponent;
  let fixture: ComponentFixture<IntakeMomentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeMomentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeMomentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
