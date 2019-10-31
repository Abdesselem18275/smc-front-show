import { TestBed } from '@angular/core/testing';

import { ParamStoreService } from './param-store.service';

describe('ParamStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamStoreService = TestBed.get(ParamStoreService);
    expect(service).toBeTruthy();
  });
});
