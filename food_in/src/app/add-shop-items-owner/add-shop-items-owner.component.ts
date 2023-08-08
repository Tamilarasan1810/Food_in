import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodServicesService } from '../food-services.service';

@Component({
  selector: 'app-add-shop-items-owner',
  templateUrl: './add-shop-items-owner.component.html',
  styleUrls: ['./add-shop-items-owner.component.css'],
})
export class AddShopItemsOwnerComponent {
  constructor(private foodServices: FoodServicesService) {}

  itemName: string = '';
  itemPrice: number | undefined;
  category: string = '';

  addItems(addItemsForm: NgForm) {
    // console.log(addItemsForm.value.itemName);

    this.foodServices
      .addShopItem(
        addItemsForm.value.itemName,
        addItemsForm.value.itemPrice,
        addItemsForm.value.category
      )
      .subscribe((response) => {
        // console.log(response.message);
        if (response.message === 'Item Added Successfully') {
          console.log('Successfully added');
          this.itemName = '';
          this.itemPrice = undefined;
          this.category = '';
        }
      });
  }
}
