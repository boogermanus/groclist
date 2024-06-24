import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroclistComponent } from './groclist.component';

describe('GroclistComponent', () => {
  let component: GroclistComponent;
  let fixture: ComponentFixture<GroclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroclistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
