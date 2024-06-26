import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocListDetailComponent } from './groc-list-detail.component';

describe('GrocListDetailComponent', () => {
  let component: GrocListDetailComponent;
  let fixture: ComponentFixture<GrocListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrocListDetailComponent]
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
