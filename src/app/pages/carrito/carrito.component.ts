import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {
  cart = this.cartService.getItems();
  isLoggedIn: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private cartService: CartService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.storageService.existsCart()) {
      this.storageService.getCart();
    }
    this.cart = this.cartService.getItems();

    this.authService.checkSession().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }

  removeItem(i: number): void {
    this.cartService.removeItem(i);
    setTimeout(() => {
      this.cart = this.cartService.getItems();
    }, 0);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getLogin(): boolean {
    return this.isLoggedIn;
  }
}
