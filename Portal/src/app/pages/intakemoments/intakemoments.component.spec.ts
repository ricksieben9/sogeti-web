import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakemomentsComponent } from './intakemoments.component';

describe('IntakemomentsComponent', () => {
  let component: IntakemomentsComponent;
  let fixture: ComponentFixture<IntakemomentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakemomentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakemomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
