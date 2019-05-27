import {async, TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {GroupService} from './group.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from '../auth/reset-password/reset-password.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {FooterComponent} from '../components/footer/footer.component';

describe('GroupService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service : GroupService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
      GroupService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });
});
