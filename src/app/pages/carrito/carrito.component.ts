import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  cart: { product: Product, quantity: number }[] = [];
  quantity: number = 0;

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { 
    this.quantity = this.cartService.cartQuantity;
   }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  close() : void {
    this.dialogRef.close();
  }
}
