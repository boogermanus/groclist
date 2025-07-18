import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListAllComponent } from './groc-list-all.component';
import { provideHttpClient } from '@angular/common/http';

describe('GrocListAllComponent', () => {
  let component: GrocListAllComponent;
  let fixture: ComponentFixture<GrocListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListAllComponent],
      providers: [
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
