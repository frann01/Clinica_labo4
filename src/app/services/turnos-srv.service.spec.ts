import { TestBed } from '@angular/core/testing';

import { TurnosSrvService } from './turnos-srv.service';

describe('TurnosSrvService', () => {
  let service: TurnosSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
