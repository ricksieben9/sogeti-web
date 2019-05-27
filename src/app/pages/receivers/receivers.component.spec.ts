import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversComponent } from './receivers.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';

describe('ReceiversComponent', () => {
  let component: ReceiversComponent;
  let fixture: ComponentFixture<ReceiversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ ReceiversComponent,
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
    fixture = TestBed.createComponent(ReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
