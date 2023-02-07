import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CallApiService } from './services/call-api.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SellerComponent } from './seller/seller.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { ShopComponent } from './shop/shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';



const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'seller', component: SellerComponent},
{path: 'shop', component: ShopComponent},
{path: 'product-detail/:_id', component: ProductDetailComponent},
{path: 'cart-page', component: CartPageComponent},
{path: 'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard]},
{path: 'seller-profile', component: SellerProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SellerComponent,
    HomeComponent,
    SellerHomeComponent,
    SellerProfileComponent,
    ShopComponent,
    ProductDetailComponent,
    CartPageComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [CallApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
