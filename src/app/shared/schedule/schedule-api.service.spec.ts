import { TestBed } from '@angular/core/testing';

import { ScheduleApiService } from './schedule-api.service';

describe('ScheduleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleApiService = TestBed.get(ScheduleApiService);
    expect(service).toBeTruthy();
  });
});
