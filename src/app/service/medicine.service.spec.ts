import {async, TestBed} from '@angular/core/testing';

import { MedicineService } from './medicine.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ReceiverService} from './receiver.service';
import {HttpClient} from '@angular/common/http';

let httpClientSpy: { get: jasmine.Spy };
let service:  MedicineService;


describe('MedicineService', () => {
  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        ReceiverService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    const service: MedicineService = TestBed.get(MedicineService);
    expect(service).toBeTruthy();
  });
});
