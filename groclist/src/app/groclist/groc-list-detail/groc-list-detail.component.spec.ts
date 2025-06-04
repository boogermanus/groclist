import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListDetailComponent } from './groc-list-detail.component';
import { provideHttpClient } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

describe('GrocListDetailComponent', () => {
  let component: GrocListDetailComponent;
  let fixture: ComponentFixture<GrocListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListDetailComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
