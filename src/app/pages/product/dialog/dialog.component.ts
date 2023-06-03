import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public quantity: number;
  public total: number;
  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    this.quantity = 1;
    this.total = this.product.price;
  }

  public add(): void {
    this.quantity++;
    this.total = this.product.price * this.quantity;
  }

  public addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.cartService.addItem();
    this.dialogRef.close();
  }

  public remove(): void {
    if (this.quantity > 1) this.quantity--;
    this.total = this.product.price * this.quantity;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
