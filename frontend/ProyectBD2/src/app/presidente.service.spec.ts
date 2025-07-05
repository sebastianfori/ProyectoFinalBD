import { TestBed } from '@angular/core/testing';

import { PresidenteService } from './presidente.service';

describe('PresidenteService', () => {
  let service: PresidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
