import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FoodServicesService } from '../food-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private http: HttpClient,
    private foodService: FoodServicesService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   // this.getDataFromBackend();
  //   this.getShops();
  // }
  shops: any;

  async getShops() {
    try {
      this.shops = await this.foodService.getShops();
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnInit() {
    // try {
    //   this.shops = await this.foodService.getShops();
    // } catch (error) {
    //   console.log(error);
    // }
    this.getShops();
  }
  log(shopId: any) {
    console.log('Selected shop: ', shopId);
    this.foodService.getSelectedShop(shopId);
    this.router.navigate(['/shopItems']);
  }

  //
  // shops = [
  //   {
  //     id: '001',
  //     name: 'Popoyes',
  //     imageUrl:
  //       'https://t4.ftcdn.net/jpg/03/99/88/89/240_F_399888929_vWmWv4uLiomugXWNyHXS1heODVdKx6bj.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: '002',
  //     name: 'Hamburgers',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/06/45/54/240_F_206455496_BStGIyW9AcinRXNqgwn3hPYahiwm7iL9.jpg',
  //     rating: 4.3,
  //   },
  //   {
  //     id: '003',
  //     name: 'SS Biriyani',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/36/94/88/240_F_236948807_aDHu2bfA4yQG7VtgDs8grwLiIhqmXtEy.jpg',
  //     rating: 4.2,
  //   },
  //   {
  //     id: '001',
  //     name: 'Popoyes',
  //     imageUrl:
  //       'https://t4.ftcdn.net/jpg/03/99/88/89/240_F_399888929_vWmWv4uLiomugXWNyHXS1heODVdKx6bj.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: '002',
  //     name: 'Hamburgers',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/06/45/54/240_F_206455496_BStGIyW9AcinRXNqgwn3hPYahiwm7iL9.jpg',
  //     rating: 4.3,
  //   },
  //   {
  //     id: '003',
  //     name: 'SS Biriyani',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/36/94/88/240_F_236948807_aDHu2bfA4yQG7VtgDs8grwLiIhqmXtEy.jpg',
  //     rating: 4.2,
  //   },
  //   {
  //     id: '001',
  //     name: 'Popoyes',
  //     imageUrl:
  //       'https://t4.ftcdn.net/jpg/03/99/88/89/240_F_399888929_vWmWv4uLiomugXWNyHXS1heODVdKx6bj.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: '002',
  //     name: 'Hamburgers',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/06/45/54/240_F_206455496_BStGIyW9AcinRXNqgwn3hPYahiwm7iL9.jpg',
  //     rating: 4.3,
  //   },
  //   {
  //     id: '003',
  //     name: 'SS Biriyani',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/36/94/88/240_F_236948807_aDHu2bfA4yQG7VtgDs8grwLiIhqmXtEy.jpg',
  //     rating: 4.2,
  //   },
  //   {
  //     id: '001',
  //     name: 'Popoyes',
  //     imageUrl:
  //       'https://t4.ftcdn.net/jpg/03/99/88/89/240_F_399888929_vWmWv4uLiomugXWNyHXS1heODVdKx6bj.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: '002',
  //     name: 'Hamburgers',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/06/45/54/240_F_206455496_BStGIyW9AcinRXNqgwn3hPYahiwm7iL9.jpg',
  //     rating: 4.3,
  //   },
  //   {
  //     id: '003',
  //     name: 'SS Biriyani',
  //     imageUrl:
  //       'https://t3.ftcdn.net/jpg/02/36/94/88/240_F_236948807_aDHu2bfA4yQG7VtgDs8grwLiIhqmXtEy.jpg',
  //     rating: 4.2,
  //   },
  // ];
}
