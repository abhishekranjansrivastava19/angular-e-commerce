import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/data';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  product: undefined | Product[]


  constructor(private productservice: ProductsService, private http: HttpClient){}

  ngOnInit():void{
    this.productservice.Product().subscribe((data)=>{
      this.product = data
    })
  }
}
