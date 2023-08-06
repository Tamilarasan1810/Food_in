import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { ShopItems } from '../models/shop-items';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css'],
})
export class ShopItemsComponent {
  // shopItems: ShopItems[] = [];
  shopItems: any = [];

  setShopItem(Item: ShopItems) {
    // console.log('Hey: ', Item);

    this.shopItems.push({ quantity: 0, item: Item });
  }

  constructor(private foodServices: FoodServicesService) {}
  quantity = 0;
  currentItem: ShopItems | undefined;
  ngOnInit() {
    // this.shopItems = this.foodServices.getSelectedShopItems();
    this.foodServices.shopItemsChanged.subscribe((data: ShopItems[]) => {
      // this.shopItems = data;
      this.shopItems = [];

      if (data) {
        data.forEach((item) => {
          this.setShopItem(item);
        });
      }
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }
  addToCart(
    productId: string,
    price: number,
    shopId: string,
    quantity: number
  ) {
    // console.log(this.foodServices.selectedShop);
    //    console.log('shopId: ', shopId, ' Quantity: ', quantity);
    this.foodServices.addItemToCart(productId, price, shopId, quantity);
  }
  cartItems: any;
  getCartItems() {
    this.cartItems = this.foodServices.getCartItem();
  }
}
