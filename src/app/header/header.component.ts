import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: String = 'default';
  sellerName: string = '';
  cartItems = 0;
  constructor(private router: Router, private token: LocalstorageService, private product: ProductsService){}

    ngOnInit():void{
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem(val.url.includes('seller') && 'seller')){
            this.menuType = 'seller'
            if(localStorage.getItem('seller')){
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore);
              this.sellerName = sellerData.name
            }
        } else{
          this.menuType = 'default';
        }
      }
    })

    let CartData = localStorage.getItem('localCart');
    if(CartData){
    this.cartItems = JSON.parse(CartData).length
    }
    this.product.CartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }
  logout(){
   localStorage.removeItem('seller');
   this.token.removeToken();
   this.router.navigate(['/'])
  }
}
