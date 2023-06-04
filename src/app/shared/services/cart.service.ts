import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCount = 0;
  cartQuantity = 0;

  items: Product[] = [];
  quantities: Map<number, number> = new Map<number, number>();

  constructor() {}

  // Guardar la cantidad de productos que se agregan al carrito -- unitario
  addItem(): void {
    this.cartItemCount++;
  }

  addToCart(product: Product, quantity: number): void {
    this.addItem();
    this.items.push(product);
    this.quantities.set(product.product_id, quantity);
  }

  getItems(): Product[] {
    return this.items;
  }

  getQuantity(productId: number): number {
    return this.quantities.get(productId) || 0;
  }
}
