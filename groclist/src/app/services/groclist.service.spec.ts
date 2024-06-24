import { TestBed } from '@angular/core/testing';

import { GroclistService } from './groclist.service';

describe('GroclistService', () => {
  let service: GroclistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroclistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
