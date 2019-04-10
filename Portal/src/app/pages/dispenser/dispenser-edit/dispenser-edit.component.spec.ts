import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenserEditComponent } from './dispenser-edit.component';

describe('DispenserEditComponent', () => {
  let component: DispenserEditComponent;
  let fixture: ComponentFixture<DispenserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
