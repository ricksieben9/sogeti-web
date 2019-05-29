import {async, inject, TestBed} from '@angular/core/testing';

import { MedicinenService } from './medicinen.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';

describe('MedicinenService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: MedicinenService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        MedicinenService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(MedicinenService);
    expect(service).toBeTruthy();
  });

});
