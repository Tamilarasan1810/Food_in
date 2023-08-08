import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private foodServices: FoodServicesService,
    private http: HttpClient
  ) {}

  cartItems: any;
  ngOnInit() {
    this.cartItems = this.foodServices.getCartItem();
    this.foodServices.cartItemsChanged.subscribe((response) => {
      this.cartItems = response;
    });
    // console.log('Cart Items: ', this.cartItems);
  }
  private ordersUrl = 'http://localhost:3000/api/orders';
  // makeOrder(): Observable<any> {
  //   return this.http.post<any>(this.getordersUrl, {});
  // }

  // makeOrder() {
  //   // Make the POST request to the API
  //   this.http.post(this.ordersUrl, {}).subscribe(
  //     (response: any) => {
  //       // Check the response from the API
  //       if (response && response.message) {
  //         // If the API returns a message property, it's likely a success response
  //         console.log('API response:', response.message);
  //         // Handle the response here (e.g., show a success message to the user)
  //       } else {
  //         // If the response doesn't have the expected message property, it may indicate an error
  //         console.error('API response with unexpected format:', response);
  //         // Handle the response as an error (e.g., show an error message to the user)
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       // Handle HTTP errors
  //       console.error('HTTP error:', error.statusText);
  //       // Handle the error here (e.g., show an error message to the user)
  //     }
  //   );
  // }
  updateOrders() {
    // console.log('Hey ');
    // this.foodServices.updateAllOrders();
    this.foodServices.updateAllOrders().subscribe(
      (response) => {
        // console.log('Orders updated successfully:', response);
        // Handle the success response here (e.g., show a success message to the user)
      },
      (error) => {
        console.log('Error inserting Order: ', error);
      }
    );
  }
  deleteCartItem(productId: string) {
    this.foodServices.deleteCartItem(productId);
  }
}
