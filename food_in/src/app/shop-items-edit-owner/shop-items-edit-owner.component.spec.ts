import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemsEditOwnerComponent } from './shop-items-edit-owner.component';

describe('ShopItemsEditOwnerComponent', () => {
  let component: ShopItemsEditOwnerComponent;
  let fixture: ComponentFixture<ShopItemsEditOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopItemsEditOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopItemsEditOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
