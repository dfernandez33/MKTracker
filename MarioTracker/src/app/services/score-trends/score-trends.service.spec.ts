import { TestBed } from '@angular/core/testing';

import { ScoreTrendsService } from './score-trends.service';

describe('ScoreTrendsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreTrendsService = TestBed.get(ScoreTrendsService);
    expect(service).toBeTruthy();
  });
});
