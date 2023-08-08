import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { ShopItems } from '../models/shop-items';

@Component({
  selector: 'app-shop-items-edit-owner',
  templateUrl: './shop-items-edit-owner.component.html',
  styleUrls: ['./shop-items-edit-owner.component.css'],
})
export class ShopItemsEditOwnerComponent {
  // shopItems: ShopItems[] = [];
  shopItems: any = [];

  constructor(private foodServices: FoodServicesService) {}

  ngOnInit() {
    this.shopItems = this.foodServices.getEditShopItems();
    this.foodServices.editShopItemsChanged.subscribe((data: ShopItems[]) => {
      this.shopItems = data;
    });
  }

  toggleEditMode(item: any) {
    item.isEditing = !item.isEditing;
  }

  saveChanges(item: any) {
    // // Save changes to your service or backend
    // console.log(item);
    // this.toggleEditMode(item);
    this.foodServices
      .editShopItem(item.productId, item.name, item.price, item.category)
      .subscribe((Response) => {
        console.log(Response);
      });
  }
  deleteItem(item: any) {
    this.foodServices.deleletShopItem(item.productId).subscribe((response) => {
      console.log(response);
    });
  }
}
