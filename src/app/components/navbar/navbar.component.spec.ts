import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {FooterComponent} from '../footer/footer.component';
import {User} from '../../_models/user';
import {AppModule} from '../../app.module';
import {UsersService} from '../../service/users.service';
import {AdminLayoutModule} from '../../layouts/admin-layout/admin-layout.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockUser : User;
  beforeEach((() => {
    let userStub: Partial<User>;

    userStub = {
      name : "test user"
    };
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        AdminLayoutModule
      ],
      declarations: [ NavbarComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [{provide: User, useValue: userStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
