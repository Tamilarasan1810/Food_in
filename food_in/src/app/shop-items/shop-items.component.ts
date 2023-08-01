import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { ShopItems } from '../models/shop-items';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css'],
})
export class ShopItemsComponent {
  shopItems: ShopItems[] = [];
  constructor(private foodServices: FoodServicesService) {}

  ngOnInit() {
    this.shopItems = this.foodServices.getSelectedShopItems();
    this.foodServices.shopItemsChanged.subscribe((data: ShopItems[]) => {
      this.shopItems = data;
    });
  }

  addToCart(productId: string, price: number, shopId: string) {
    // console.log(this.foodServices.selectedShop);
    this.foodServices.addItemToCart(productId, price, shopId);
  }
  cartItems: any;
  getCartItems() {
    this.cartItems = this.foodServices.getCartItem();
  }
}
