import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCount = 0;
  cartQuantity = 0;

  items: { product: Product; quantity: number }[] = [];

  constructor(private storageService: StorageService) {
    this.loadCart();
  }

  // Guardar el carrito en el localStorage
  private saveCart(): void {
    this.storageService.setCart(this.items);
  }

  // Cargar el carrito desde el localStorage al iniciar la aplicación
  private loadCart(): void {
    if (this.storageService.existsCart()) {
      this.items = this.storageService.getCart();
      this.cartItemCount = this.items.length;
    }
  }

  // Guardar la cantidad de productos que se agregan al carrito -- unitario
  addItem(product: Product): void {
    const existingItem = this.items.find(
      (item) => item.product.product_id === product.product_id
    );

    if (!existingItem) {
      this.cartItemCount++;
    }
  }

  addToCart(product: Product, quantity: number): void {
    this.addItem(product);
    const existingItem = this.items.find(
      (item) => item.product.product_id === product.product_id
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Actualizar cantidad si el producto ya está en el carrito
    } else {
      this.items.push({ product, quantity }); // Agregar nuevo producto al carrito
    }
    this.saveCart();
  }

  getItems(): Product[] {
    const cartData = this.storageService.getCart();
    this.items = cartData.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    return this.items.map((item) => item.product);
  }

  getQuantity(productId: number): number {
    const item = this.items.find(
      (item) => item.product.product_id === productId
    );
    return item ? item.quantity : 0;
  }

  removeItem(i: number): void {
    if (this.items[i].quantity > 1) {
      this.items[i].quantity--;
    } else {
      this.items.splice(i, 1);
      this.cartItemCount--;
    }
    this.saveCart();
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.items = [];
    this.cartItemCount = 0;
    this.saveCart();
  }
}
