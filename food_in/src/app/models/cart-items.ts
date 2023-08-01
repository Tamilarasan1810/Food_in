export class CartItems {
  public productId: string;
  public qty: number;
  public shopId: string;
  public price: number;

  constructor(Id: string, shopId: string, qty: number, price: number) {
    this.productId = Id;
    this.shopId = shopId;
    this.qty = qty;
    this.price = price;
  }
}
