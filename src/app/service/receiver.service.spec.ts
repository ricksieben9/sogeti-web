import {async, TestBed} from '@angular/core/testing';

import {ReceiverService} from './receiver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';

describe('ReceiverService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: ReceiverService;

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
    service = TestBed.get(ReceiverService);
    expect(service).toBeTruthy();
  });
});
