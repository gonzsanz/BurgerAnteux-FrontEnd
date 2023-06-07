import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetallesService } from 'src/app/shared/services/detalles.service';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss'],
})
export class DialogDetallesComponent implements OnInit {
  listaDetalles: any[] | undefined;
  order_id!: number;

  constructor(
    private detalleService: DetallesService,
    private dialogRef: MatDialogRef<DialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.order_id = this.data.order_id;
    this.getDetailsByOrder(this.order_id);
    console.log(this.order_id);
  }

  getDetailsByOrder(order_id: number) {
    this.detalleService.getDetailsByOrder(order_id).subscribe({
      next: (result) => {
        this.listaDetalles = result;
        console.log(this.listaDetalles);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
