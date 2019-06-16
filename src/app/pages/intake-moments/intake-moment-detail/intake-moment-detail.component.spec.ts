import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IntakeMomentDetailComponent} from './intake-moment-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {FooterComponent} from '../../../components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';
import {By} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

class MockedUserService {
  private http: HttpClient;


}

describe('IntakeMomentDetailComponent', () => {
  let component: IntakeMomentDetailComponent;
  let fixture: ComponentFixture<IntakeMomentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ IntakeMomentDetailComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]})
    .compileComponents();

    fixture = TestBed.createComponent(IntakeMomentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  // it('should render th in ***', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('th')).toContain('Toediener');
  // });

  it('should call backToOverview', () => {
    spyOn(component, 'backToOverview');
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('button#btnBackToOverview')).nativeElement;
    element.click();
    expect(component.backToOverview).toHaveBeenCalled();
    expect(component.backToOverview).not.toThrow();
  });

  it('column header should contain Starttijd', () => {
      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('th#colStartTime').textContent).toContain('Starttijd');
  });

  it('column header should contain Eindtijd', () => {
      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('th#colEndTime').textContent).toContain('Eindtijd');
  });

  it('column header should contain Toediener', () => {
      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('th#colDispenser').textContent).toContain('Toediener');
  });

  it('column header should contain Prioriteit', () => {
      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('th#colPriority').textContent).toContain('Prioriteit');
  });


  it('should fill list', () => {
    component.dispensers
  });
});
