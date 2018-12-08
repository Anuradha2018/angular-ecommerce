import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  productId;

 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private categoryService: CategoryService,
   private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).valueChanges().pipe(
        take(1)
      ).subscribe(p => this.product = p);
    }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
