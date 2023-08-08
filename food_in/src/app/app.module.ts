import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './items/items.component';
import { CartComponent } from './cart/cart.component';
import { MyOrderStatusComponent } from './my-order-status/my-order-status.component';
import { ReviewComponent } from './review/review.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { RouterModule } from '@angular/router';
import { ShopOrderOwnerComponent } from './shop-order-owner/shop-order-owner.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddShopItemsOwnerComponent } from './add-shop-items-owner/add-shop-items-owner.component';
import { ShopItemsEditOwnerComponent } from './shop-items-edit-owner/shop-items-edit-owner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ItemsComponent,
    CartComponent,
    MyOrderStatusComponent,
    ReviewComponent,
    ShopItemsComponent,
    ShopOrderOwnerComponent,
    AuthenticateComponent,
    AddShopItemsOwnerComponent,
    ShopItemsEditOwnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
