import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(
    private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe((products: Product[]) => {

      this.filteredProducts = this.products = products;
    });
  }

   filter(query: string) {
    this.filteredProducts = query ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
   }
  ngOnInit() {
  }

}
