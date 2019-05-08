import { TestBed } from '@angular/core/testing';

import { MedicinenService } from './medicinen.service';

describe('MedicinenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicinenService = TestBed.get(MedicinenService);
    expect(service).toBeTruthy();
  });
});
