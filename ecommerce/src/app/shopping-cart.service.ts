import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    return new Promise<Observable<ShoppingCart>>((resolve, reject) => {
      const o$ = this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
        map((x: {items: {[key: string]: ShoppingCartItem}}) => new ShoppingCart(x.items))
      );

      resolve(o$);
    });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();

    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId)
      return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId() as string;
    let item$ = this.getItem(cartId, product.$key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = ((item && item.quantity) || 0) + change;

        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      });
  }
}