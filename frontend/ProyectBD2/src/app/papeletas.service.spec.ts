import { TestBed } from '@angular/core/testing';

import { PapeletasService } from './papeletas.service';

describe('PapeletasService', () => {
  let service: PapeletasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PapeletasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
