import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IntakeMomentsReceiverComponent} from './intake-moments-receiver.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IntakeMomentDetailComponent} from '../intake-moment-detail/intake-moment-detail.component';
import {SidebarComponent} from '../../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {FooterComponent} from '../../../components/footer/footer.component';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';

describe('IntakeMomentsReceiverComponent', () => {
  let component: IntakeMomentsReceiverComponent;
  let fixture: ComponentFixture<IntakeMomentsReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ IntakeMomentsReceiverComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]})
      .compileComponents();

    fixture = TestBed.createComponent(IntakeMomentsReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
