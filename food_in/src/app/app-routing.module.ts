import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { CartComponent } from './cart/cart.component';
import { MyOrderStatusComponent } from './my-order-status/my-order-status.component';
import { ShopOrderOwnerComponent } from './shop-order-owner/shop-order-owner.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'shopItems', component: ShopItemsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'myOrders', component: MyOrderStatusComponent },
  { path: 'shopOrders', component: ShopOrderOwnerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
