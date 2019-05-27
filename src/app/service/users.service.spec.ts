import {async, TestBed} from '@angular/core/testing';

import { UsersService } from './users.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';

describe('UsersService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: UsersService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports:      [
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        UsersService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]})
      .compileComponents();
  }));
  it('should be created', () => {
    service = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
