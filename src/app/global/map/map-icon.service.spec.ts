import { TestBed } from '@angular/core/testing';

import { MapIconService } from './map-icon.service';

describe('MapIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapIconService = TestBed.get(MapIconService);
    expect(service).toBeTruthy();
  });
});
