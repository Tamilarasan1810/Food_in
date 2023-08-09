import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { UserAuthenticationService } from '../user-authentication.service';
import { ShopOrderListsOwner } from '../models/shop-order-lists-owner';

@Component({
  selector: 'app-my-order-status',
  templateUrl: './my-order-status.component.html',
  styleUrls: ['./my-order-status.component.css'],
})
export class MyOrderStatusComponent {
  constructor(
    private foodServices: FoodServicesService,
    private userAuth: UserAuthenticationService
  ) {}
  orderStatus: any;

  userDetails: any;
  ngOnInit() {
    // this.userDetails = this.userAuth.getUserDetails();
    // this.userAuth.userDetailsChanged.subscribe((response) => {
    //   this.userDetails = response;
    // });
    // this.orderStatus = this.foodServices.getOrderStatus(
    //   this.orderStatus.userId
    // );
    this.userDetails = this.userAuth.LoggedUserDetails;
    // console.log(this.userDetails.userId);
    // this.orderStatus = this.foodServices.getOrderStatus('U0001');
    this.orderStatus = this.foodServices.getOrderStatus(
      this.userDetails.userId
    );
    this.foodServices.orderStatusChanged.subscribe((data: any) => {
      this.orderStatus = data;
    });
  }

  //
  //}

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
        quantity: 1,
      },
      {
        productId: 'P0002',
        name: 'Dosai',
        shopId: 'S0001',
        category: 'VEG',
        review: 'No review',
        rating: 4.2,
        price: 40,
        quantity: 1,
      },
      {
        productId: 'P0003',
        name: 'Chicken Biriyani',
        shopId: 'S0001',
        category: 'NON-VEG',
        review: 'No review',
        rating: 4.2,
        price: 180,
        quantity: 1,
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

    }
    






  //
  //





}
