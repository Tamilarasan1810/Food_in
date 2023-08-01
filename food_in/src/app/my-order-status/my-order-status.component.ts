import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';

@Component({
  selector: 'app-my-order-status',
  templateUrl: './my-order-status.component.html',
  styleUrls: ['./my-order-status.component.css'],
})
export class MyOrderStatusComponent {
  constructor(private foodServices: FoodServicesService) {}
  orderStatus: any;

  ngOnInit() {
    this.orderStatus = this.foodServices.getOrderStatus('U0001');
    this.foodServices.orderStatusChanged.subscribe((data: any) => {
      this.orderStatus = data;
    });
  }
}
