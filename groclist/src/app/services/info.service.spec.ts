import { TestBed } from '@angular/core/testing';

import { InfoService } from './info.service';
import { provideHttpClient } from '@angular/common/http';

describe('InfoService', () => {
  let service: InfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(InfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
