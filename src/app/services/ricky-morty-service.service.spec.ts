import { TestBed } from '@angular/core/testing';

import { RickyMortyServiceService } from './ricky-morty-service.service';

describe('RickyMortyServiceService', () => {
  let service: RickyMortyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyMortyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
