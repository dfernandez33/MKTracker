import { TestBed } from '@angular/core/testing';

import { GPMapService } from './gpmap.service';

describe('GPMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GPMapService = TestBed.get(GPMapService);
    expect(service).toBeTruthy();
  });
});
