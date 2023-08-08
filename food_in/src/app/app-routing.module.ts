import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { CartComponent } from './cart/cart.component';
import { MyOrderStatusComponent } from './my-order-status/my-order-status.component';
import { ShopOrderOwnerComponent } from './shop-order-owner/shop-order-owner.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { AuthGuard } from './auth.guard';
import { AddShopItemsOwnerComponent } from './add-shop-items-owner/add-shop-items-owner.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'shopItems',
    component: ShopItemsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'myOrders',
    component: MyOrderStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shopOrders',
    component: ShopOrderOwnerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'addItems', component: AddShopItemsOwnerComponent },
  { path: 'login', component: AuthenticateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
