import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentsComponent } from './intake-moments.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {By} from '@angular/platform-browser';

describe('IntakeMomentsComponent', () => {
  let component: IntakeMomentsComponent;
  let fixture: ComponentFixture<IntakeMomentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule
      ],
      declarations: [ IntakeMomentsComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ]    })
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

  it('should call getReceivers() on init', () => {
    spyOn(component, 'getReceivers');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.getReceivers).toHaveBeenCalled();
  });
});
