import { TestBed } from '@angular/core/testing';

import { MenuDataBuilderService } from './menu-data-builder.service';

describe('MenuDataBuilderService', () => {
  let service: MenuDataBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDataBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
