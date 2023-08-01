import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderOwnerComponent } from './shop-order-owner.component';

describe('ShopOrderOwnerComponent', () => {
  let component: ShopOrderOwnerComponent;
  let fixture: ComponentFixture<ShopOrderOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopOrderOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopOrderOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
