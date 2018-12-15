import { TestBed } from '@angular/core/testing';

import { LeaderboadService } from './leaderboad.service';

describe('LeaderboadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderboadService = TestBed.get(LeaderboadService);
    expect(service).toBeTruthy();
  });
});
