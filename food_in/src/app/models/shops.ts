export class Shops {
  public shopId: string;
  public shopName: string;
  public rating: number;

  constructor(Id: string, Name: string, rating: number) {
    this.shopId = Id;
    this.shopName = Name;
    this.rating = rating;
  }
}
