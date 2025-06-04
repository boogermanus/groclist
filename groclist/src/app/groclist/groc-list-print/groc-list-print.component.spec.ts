import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListPrintComponent } from './groc-list-print.component';

describe('GrocListPrintComponent', () => {
  let component: GrocListPrintComponent;
  let fixture: ComponentFixture<GrocListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListPrintComponent]
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
