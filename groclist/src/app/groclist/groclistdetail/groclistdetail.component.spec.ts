import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroclistdetailComponent } from './groclistdetail.component';

describe('GroclistdetailComponent', () => {
  let component: GroclistdetailComponent;
  let fixture: ComponentFixture<GroclistdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroclistdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroclistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
