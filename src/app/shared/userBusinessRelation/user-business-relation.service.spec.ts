import { TestBed } from '@angular/core/testing';

import { UserBusinessRelationService } from './user-business-relation.service';

describe('UserBusinessRelationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBusinessRelationService = TestBed.get(UserBusinessRelationService);
    expect(service).toBeTruthy();
  });
});
