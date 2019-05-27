import {async, TestBed} from '@angular/core/testing';

import { IntakeMomentService } from './intake-moment.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';

describe('IntakeMomentService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: IntakeMomentService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        IntakeMomentService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(IntakeMomentService);
    expect(service).toBeTruthy();
  });
});
