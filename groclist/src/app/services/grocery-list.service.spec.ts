import { TestBed } from '@angular/core/testing';

import { GroceryListService } from './grocery-list.service';
import {HttpTestingController} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('GroceryListService', () => {
  let service: GroceryListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
