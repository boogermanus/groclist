import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListComponent } from './groc-list.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

describe('GrocListComponent', () => {
  let component: GrocListComponent;
  let fixture: ComponentFixture<GrocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListComponent],
      providers: [
        provideHttpClient(),
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
