import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentsComponent } from './intake-moments.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {HttpClient} from '@angular/common/http';


class MockedReceiverService {
  private http: HttpClient;
  getAllReceivers(){
    let allReceivers : any[];
    allReceivers = ['rick, john, luuk'];
    return allReceivers;
  }
}

describe('IntakeMomentsComponent', () => {
  let component: IntakeMomentsComponent;
  let fixture: ComponentFixture<IntakeMomentsComponent>;
  let service: MockedReceiverService;
  let httpClientSpy: { get: jasmine.Spy };
  let receivers: any;
  let http: HttpClient;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule
      ],
      declarations: [ IntakeMomentsComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ]})
    .compileComponents();

    service = new MockedReceiverService();
    fixture = TestBed.createComponent(IntakeMomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getReceivers() on init', () => {
    spyOn(component, 'getReceivers');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.getReceivers).toHaveBeenCalled();
    expect(component.getReceivers).not.toThrow();
  });

  it('should fill list of receivers after executing getAllReceivers()', () => {
    component.receivers = service.getAllReceivers();
    expect(component.receivers).not.toBeUndefined();
  });
});
