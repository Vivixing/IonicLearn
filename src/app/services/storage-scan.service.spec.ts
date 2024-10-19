import { TestBed } from '@angular/core/testing';

import { StorageScanService } from './storage-scan.service';

describe('StorageScanService', () => {
  let service: StorageScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
