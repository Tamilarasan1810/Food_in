import { EventEmitter, Injectable } from '@angular/core';
import { Shops } from './models/shops';
import { HttpClient } from '@angular/common/http';
import { ShopItems } from './models/shop-items';
import { Observable } from 'rxjs';
import { CartItems } from './models/cart-items';
import { ShopOrderListsOwner } from './models/shop-order-lists-owner';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodServicesService {
  constructor(private http: HttpClient) {}

  private shops: Shops[] = [];

  data: any;
  // getShops() {
  //   this.http.get<Shops[]>('http://localhost:3000/api/getShops').subscribe(
  //     (response) => {
  //       this.data = response;
  //       console.log('shops data: ', this.data);
  //     },
  //     (error) => {
  //       console.log('Error fetching data from backend: ', error);
  //     }
  //   );
  //   this.shops = this.data;
  //   console.log(this.shops);
  //   return this.shops;
  // }

  private getShopsUrl = 'http://localhost:3000/api/getShops';
  async getShops(): Promise<Shops[]> {
    try {
      this.data = await this.http.get<Shops[]>(this.getShopsUrl).toPromise();
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  selectedShop: any = 'S0002';

  itemData: any;
  shopItems: ShopItems[] = [];
  shopItemsChanged = new EventEmitter<ShopItems[]>();
  getSelectedShopItems() {
    this.shopItems = this.itemData;
    return this.shopItems;
  }

  getSelectedShop(shopId: any) {
    this.selectedShop = shopId;
    this.fetchSelectedShopItem(this.selectedShop);
    this.shopItemsChanged.emit(this.shopItems);
  }

  async fetchSelectedShopItem(selectedShop: string): Promise<ShopItems[]> {
    const getShopitemsUrl = `http://localhost:3000/api/getShopItem/:${selectedShop}`;
    try {
      this.itemData = await this.http
        .get<ShopItems[]>(getShopitemsUrl)
        .toPromise();
      console.log(this.itemData);
      this.shopItems = this.itemData;
      this.shopItemsChanged.emit(this.shopItems);

      return this.itemData;
    } catch (error) {
      throw error;
    }
  }

  cartItems: CartItems[] = [];
  addItemToCart(productId: string, price: number, shopId: string) {
    this.cartItems.push({
      productId: productId,
      shopId: shopId,
      qty: 1,
      price: price,
    });
    //console.log(this.cartItems[0].price);
  }
  getCartItem() {
    return this.cartItems.slice();
  }

  // to update cart items to allorders table in database
  private updateOrdersUrl = 'http://localhost:3000/api/updateAllOrders';
  // updateAllOrders() {
  //   console.log('guys');
  //   const items = this.cartItems;
  //   return this.http.post<any>(this.updateOrdersUrl, { items });
  //   //console.log(response);
  // }
  updateAllOrders(): Observable<any> {
    const items = this.cartItems;
    this.cartItems = [];
    return this.http.post<any>(this.updateOrdersUrl, { items });
  }
  //orderStatus
  orderStatus: any;
  orderStatusChanged = new EventEmitter<[]>();
  getOrderStatus(userId: string) {
    this.fetchOrderStatus(userId);
    this.orderStatusChanged.emit(this.orderStatus);
  }
  async fetchOrderStatus(userId: string): Promise<ShopItems[]> {
    const getOrderStatus = `http://localhost:3000/api/getOrderStatus/:${userId}`;
    try {
      this.itemData = await this.http
        .get<ShopItems[]>(getOrderStatus)
        .toPromise();
      //console.log('Order Status: ', this.itemData);
      this.orderStatus = this.itemData;
      this.orderStatusChanged.emit(this.orderStatus);

      return this.itemData;
    } catch (error) {
      throw error;
    }
  }

  //^^^^^^^^^^^^orderStatus

  //shop owner orderStatus side

  //to get the shopSideOrderStatus list from the database : )
  shopSideOrderStatus: any;
  shopSideOrderStatusChanged = new EventEmitter<[]>();
  getShopSideOrders() {
    this.fetchShopSideOrders('S0001'); // It depends on the shop to shop : shop id is unique for each shop
    this.shopSideOrderStatusChanged.emit(this.shopSideOrderStatus);
  }
  async fetchShopSideOrders(shopId: string): Promise<ShopItems[]> {
    const getShopSideOrderStatus = `http://localhost:3000/api/getShopSideOrderStatus/:${shopId}`;
    try {
      this.itemData = await this.http
        .get<ShopItems[]>(getShopSideOrderStatus)
        .toPromise();
      //console.log('Order Status: ', this.itemData);
      this.shopSideOrderStatus = this.itemData;
      this.shopSideOrderStatusChanged.emit(this.shopSideOrderStatus);

      return this.itemData;
    } catch (error) {
      throw error;
    }
  }

  //to update the orderStatus of the order

  updateShopOrderStatus(orderId: string, status: number): Observable<any> {
    const getShopOrderStatus = `http://localhost:3000/api/updateShopOrderStatus`;

    return this.http.post<any>(getShopOrderStatus, {
      orderId: orderId,
      status: status,
    });
  }

  //to fetch the orderId list items to the owners list

  // getProductsListByOrderId(orderId: string): Observable<ShopOrderListsOwner[]> {
  //   const getProductsListByOrderIdUrl = `http://localhost:3000/api/getProductsListByOrderId`;
  //   return this.http.post<ShopOrderListsOwner[]>(getProductsListByOrderIdUrl, {orderId}).pipe(
  //     map((response: any[]) => {
  //       const products = response.map((item) => new ShopItems(item.productId, item.name, item.shopId,item.category,item.review,item.rating,item.price));
  //       return new ShopOrderListsOwner(orderId, response);
  //     });
  // }
  getProductsListByOrderId(orderId: string): Observable<ShopOrderListsOwner> {
    const getProductsListByOrderIdUrl = `http://localhost:3000/api/getProductsListByOrderId`;
    return this.http.post<any>(getProductsListByOrderIdUrl, { orderId }).pipe(
      map((response: any[]) => {
        const products = response.map(
          (item) =>
            new ShopItems(
              item.productId,
              item.name,
              item.shopId,
              item.category,
              item.review,
              item.rating,
              item.price
            )
        );
        return new ShopOrderListsOwner(orderId, products);
      })
    );
  }
  // getProductsListByOrderId(orderId: string): Observable<any[]> {
  //   console.log(orderId);
  //   const getProductsListByOrderIdUrl = `http://localhost:3000/api/getProductsListByOrderId`;
  //   return this.http.post<any[]>(getProductsListByOrderIdUrl, { orderId });
  // }
  // async updateShopOrderStatus(orderId: string): Promise<ShopItems[]> {
  //   const getShopOrderStatus = `http://localhost:3000/api/updateShopOrderStatus/:${orderId}`;
  //   try {
  //     this.itemData = await this.http
  //       .get<ShopItems[]>(getShopOrderStatus)
  //       .toPromise();
  //     console.log('Order Status: ', this.itemData);
  //     //this.shopSideOrderStatus = this.itemData;
  //     //this.shopSideOrderStatusChanged.emit(this.shopSideOrderStatus);

  //     return this.itemData;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  //^^^^^^^^^^^^shop owner orderStatus side
}
