import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MedicineComponent} from './medicine.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';
import {MedicineService} from '../../service/medicine.service';

describe('MedicineComponent', () => {
  let component: MedicineComponent;
  let fixture: ComponentFixture<MedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ MedicineComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
      ],
    providers: [BsModalService, ComponentLoaderFactory, PositioningService, MedicineService]})
    .compileComponents();

    fixture = TestBed.createComponent(MedicineComponent);
    component = fixture.componentInstance;
    component.list = ["paracetamol","ibuprofen","viagra"];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of medicine', () => {
      expect(component.list.length).toBeGreaterThanOrEqual(1);
      expect(component.list).not.toBe(undefined);
  })
});
