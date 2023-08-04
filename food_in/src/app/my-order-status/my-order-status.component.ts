import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { UserAuthenticationService } from '../user-authentication.service';

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
}
