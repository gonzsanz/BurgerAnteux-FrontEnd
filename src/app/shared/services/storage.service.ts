import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  existsCart(): boolean {
    return sessionStorage.getItem('cart') !== null;
  }

  setCart(cart: { product: Product; quantity: number }[]): void {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): { product: Product; quantity: number }[] {
    const cartData = sessionStorage.getItem('cart');
    if (cartData !== null) {
      return JSON.parse(cartData);
    }
    return [];
  }

  clearCart(): void {
    sessionStorage.removeItem('cart');
  }
}
