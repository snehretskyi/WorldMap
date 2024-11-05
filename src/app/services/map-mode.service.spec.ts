import { TestBed } from '@angular/core/testing';

import { MapModeService } from './map-mode.service';

describe('MapModeService', () => {
  let service: MapModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
