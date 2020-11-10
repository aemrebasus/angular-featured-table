import { TestBed } from '@angular/core/testing';

import { AeDynamicTableService } from './ae-dynamic-table.service';

describe('AeDynamicTableService', () => {
  let service: AeDynamicTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeDynamicTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
