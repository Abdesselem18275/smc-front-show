import { TestBed } from '@angular/core/testing';

import { AwsObjectsService } from './aws-objects.service';

describe('AwsObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsObjectsService = TestBed.get(AwsObjectsService);
    expect(service).toBeTruthy();
  });
});
