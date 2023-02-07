import { Component } from '@angular/core';
import { product, Product } from '../model/data';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
 product: any
 ProductQuantity:number=1;
 removeCart = false
   constructor(private detail: ProductsService, private activeRoute: ActivatedRoute){}

   ngOnInit(){
    let productId = this.activeRoute.snapshot.paramMap.get('_id')
    // console.log(productId)
    productId && this.detail.getProduct(productId).subscribe((data)=>{
      // console.log(data)
      this.product = data

      let CartData = localStorage.getItem('localCart')
      if(productId && CartData){
        let items = JSON.parse(CartData);
        items = items.filter((item: product)=>productId==item._id)
        if(items.length){
          this.removeCart = true
        }else{
          this.removeCart = false
        }
      }
    })
   }
   HandleQuantity(val:string){
    if(this.ProductQuantity<20 && val==='plus'){
      this.ProductQuantity += 1;
    } else if(this.ProductQuantity>1 && val==='min'){
      this.ProductQuantity -= 1
    }
   }

   AddToCart(){
    if(this.product){
      this.product.quantity = this.ProductQuantity
      if(!localStorage.getItem('seller')){
      this.detail.localAddToCart(this.product)
      this.removeCart = true
      } else {
        console.log('else')
      }
    }
   }

   RemoveToCart(productId: string){
    this.detail.removeItemFromCart(productId)
    this.removeCart = false
   }
}
