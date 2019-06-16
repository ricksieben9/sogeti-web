import {async, TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {GroupService} from './group.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('GroupService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service : GroupService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
      GroupService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });
});
