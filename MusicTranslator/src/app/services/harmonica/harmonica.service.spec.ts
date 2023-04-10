import { TestBed } from '@angular/core/testing';

import { HarmonicaService } from './harmonica.service';

describe('HarmonicaService', () => {
  let service: HarmonicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarmonicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
