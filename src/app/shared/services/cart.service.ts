import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemCount = 0;
  quantity = 1;
  cartQuantity = 0;
  
  cart: { product: Product, quantity: number }[] = [];

  private cartUpdated = new Subject<{ product: Product, quantity: number }[]>();


  constructor() { }

addToCart(product: Product, quantity: number): void {
    const existingItem = this.cart.find(item => item.product.product_id === product.product_id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.cartUpdated.next(this.cart);
  }

  getCart(): Observable<{ product: Product, quantity: number }[]> {
    return this.cartUpdated.asObservable();
  }


  //guardar la cantidad de productos que se agregan al carrito -- unitario
  addItem(): void {
    this.cartItemCount++;
  }



}
