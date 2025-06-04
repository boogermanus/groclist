import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListItemAllComponent } from './groc-list-item-all.component';
import {provideHttpClient} from "@angular/common/http";

describe('GrocListItemAllComponent', () => {
  let component: GrocListItemAllComponent;
  let fixture: ComponentFixture<GrocListItemAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListItemAllComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocListItemAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
