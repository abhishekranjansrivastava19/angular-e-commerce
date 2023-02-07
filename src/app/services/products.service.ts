import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product, Product } from '../model/data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  CartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }

  Product(){
   return this.http.get<Product[]>('http://localhost:3000/api/v1/products')
  }

  getProduct(_id: string){
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/${_id}`)
  }

  localAddToCart(data: product){
    let CartData = [];
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      CartData = JSON.parse(localCart);
      CartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(CartData))
    }
    this.CartData.emit(CartData)
  }

  removeItemFromCart(productId: string){
    let CartData = localStorage.getItem('localCart');
    if(CartData){
      let items:product[] = JSON.parse(CartData)
      items = items.filter((item:product)=>productId!==item._id)

      localStorage.setItem('localCart', JSON.stringify(items))
      this.CartData.emit(items)
      }
    }
  }

