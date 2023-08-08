import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopItemsOwnerComponent } from './add-shop-items-owner.component';

describe('AddShopItemsOwnerComponent', () => {
  let component: AddShopItemsOwnerComponent;
  let fixture: ComponentFixture<AddShopItemsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopItemsOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShopItemsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
