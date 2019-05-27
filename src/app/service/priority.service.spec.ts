import {async, TestBed} from '@angular/core/testing';

import { PriorityService } from './priority.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';

describe('PriorityService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: PriorityService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        PriorityService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(PriorityService);
    expect(service).toBeTruthy();
  });
});
