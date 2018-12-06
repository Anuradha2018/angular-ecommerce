import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productKr;
  constructor(private productService: ProductService) {
   }

  ngOnInit() {
    this.productKr = this.productService.getAll();
    console.log(this.productKr);
  }

}
