import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';

@Component({
  selector: 'app-shop-order-owner',
  templateUrl: './shop-order-owner.component.html',
  styleUrls: ['./shop-order-owner.component.css'],
})
export class ShopOrderOwnerComponent {
  constructor(private foodServices: FoodServicesService) {}
  shopSideOrderStatus: any;

  ngOnInit() {
    this.shopSideOrderStatus = this.foodServices.getShopSideOrders();
    this.foodServices.shopSideOrderStatusChanged.subscribe((data: any) => {
      this.shopSideOrderStatus = data;
    });
  }
  updateOrderStatus(orderId: string, userId: string, orderStatus: number) {
    var status = 1 - orderStatus;
    //console.log('function status: ', orderStatus);
    this.foodServices.updateShopOrderStatus(orderId, status).subscribe(
      (response) => {
        //console.log('Yesssssssssssssssssssssssssssssss');
        // console.log('Orders Status updated successfully:', response);

        this.foodServices.getOrderStatus('U0001'); //To update the My orders page to show that the order is being accepted or rejected
        this.foodServices.getShopSideOrders(); // to update the shop-order-owner after clicking the button
      },
      (error) => {
        console.log('Error inserting Order: ', error);
      }
    );
  }

  // updateOrders() {
  //   // console.log('Hey ');
  //   // this.foodServices.updateAllOrders();
  //   this.foodServices.updateAllOrders().subscribe(
  //     (response) => {
  //       console.log('Orders updated successfully:', response);
  //       // Handle the success response here (e.g., show a success message to the user)
  //     },
  //     (error) => {
  //       console.log('Error inserting Order: ', error);
  //     }
  //   );
  // }
}
