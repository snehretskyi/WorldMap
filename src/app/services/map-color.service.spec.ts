import { TestBed } from '@angular/core/testing';

import { MapColorService } from './map-color.service';

describe('MapColorService', () => {
  let service: MapColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
