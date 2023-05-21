import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public quantity: number;
  public total: number;
  constructor(
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

  public remove(): void {
    if (this.quantity > 1)
    this.quantity--;
    this.total = this.product.price * this.quantity;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
