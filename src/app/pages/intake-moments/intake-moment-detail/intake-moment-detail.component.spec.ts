import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeMomentDetailComponent } from './intake-moment-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {FooterComponent} from '../../../components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';
import {By} from '@angular/platform-browser';

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
    const element = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement; //WAAROM, MEERDERE BTN-PRIMARY IN HTML
    element.click();
    expect(component.backToOverview).toHaveBeenCalled();

  });
});
