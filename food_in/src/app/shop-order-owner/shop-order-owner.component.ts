import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { ShopOrderListsOwner } from '../models/shop-order-lists-owner';

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
  ordersList: ShopOrderListsOwner = {
    orderId: 'O0004',
    products: [
      {
        productId: 'P0001',
        name: 'shawarma',
        shopId: 'S0001',
        category: 'NON-VEG',
        review: 'No review',
        rating: 4.2,
        price: 160,
      },
      {
        productId: 'P0002',
        name: 'Dosai',
        shopId: 'S0001',
        category: 'VEG',
        review: 'No review',
        rating: 4.2,
        price: 40,
      },
      {
        productId: 'P0003',
        name: 'Chicken Biriyani',
        shopId: 'S0001',
        category: 'NON-VEG',
        review: 'No review',
        rating: 4.2,
        price: 180,
      },
    ],
  };
  showProducts: boolean = false;

  toggleProducts() {
    this.showProducts = !this.showProducts;
  }
  getOrderProducts(orderId: string) {
    this.foodServices.getProductsListByOrderId(orderId).subscribe(
      (response) => {
        //console.log('Response from server:', response);
        this.ordersList = response;
        // console.log('Orders List: shop owner: ', this.ordersList);
      },
      (error) => {
        console.error('Error from server:', error);
      }
    );
    console.log('clicked!!');
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
