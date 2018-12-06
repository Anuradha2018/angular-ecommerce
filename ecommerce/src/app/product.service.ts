import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Product } from './../app/models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/product').push(product);
  }
  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  /*getAll(): AngularFireList<Product> {
    return this.db.list('/product');
  }*/

  get(productId: string): AngularFireObject<Product> {
    return this.db.object('/products/' + productId);
  }
/*
  update(productId: string, product: Product) {
    return this.db.object('/product/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/product/' + productId).remove();
  }**/
}
