import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispenserComponent } from './create-dispenser.component';

describe('CreateDispenserComponent', () => {
  let component: CreateDispenserComponent;
  let fixture: ComponentFixture<CreateDispenserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDispenserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispenserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
