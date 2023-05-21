import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Product;

  ngOnInit(): void {}

  constructor(private dialog: MatDialog) {
    this.product = {
      product_id: 0,
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
    };
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: 'auto',
      data: this.product,
    });
  }
}
