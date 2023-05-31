import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemCount = 0;
  quantity = 0;

  addItemToCart(): void {
    this.cartItemCount++;
  }
}
