import { TestBed, inject } from '@angular/core/testing';

import { IndividuApiService } from './individu-api.service';

describe('IndividuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividuApiService]
    });
  });

  it('should be created', inject([IndividuApiService], (service: IndividuApiService) => {
    expect(service).toBeTruthy();
  }));
});
