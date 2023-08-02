import { ShopItems } from './shop-items';

export class ShopOrderListsOwner {
  public orderId: string;
  public products: ShopItems[];

  constructor(orderId: string, products: ShopItems[]) {
    this.orderId = orderId;
    this.products = products;
  }
}
