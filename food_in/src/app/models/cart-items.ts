export class CartItems {
  public productId: string;
  public qty: number;
  public shopId: string;
  public price: number;
  public name: string;

  constructor(
    Id: string,
    shopId: string,
    name: string,
    qty: number,
    price: number
  ) {
    this.productId = Id;
    this.shopId = shopId;
    this.name = name;
    this.qty = qty;
    this.price = price;
  }
}
