import { ShopItems } from './shop-items';
import { ShopOrderListItemsOwner } from './shop-order-list-items-owner';

export class ShopOrderListsOwner {
  public orderId: string;
  public products: ShopOrderListItemsOwner[];

  constructor(orderId: string, products: ShopOrderListItemsOwner[]) {
    this.orderId = orderId;
    this.products = products;
  }
}
