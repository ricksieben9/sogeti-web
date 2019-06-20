import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenserComponent } from './dispenser.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';

describe('DispenserComponent', () => {
  let component: DispenserComponent;
  let fixture: ComponentFixture<DispenserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
      ],
      declarations:[
        DispenserComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [BsModalService,
        ComponentLoaderFactory,
        PositioningService]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
