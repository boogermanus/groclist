import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListPrintComponent } from './groc-list-print.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

describe('GrocListPrintComponent', () => {
  let component: GrocListPrintComponent;
  let fixture: ComponentFixture<GrocListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListPrintComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
