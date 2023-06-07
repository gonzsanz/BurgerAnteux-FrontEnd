import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Detalle } from 'src/app/shared/interfaces/detalle';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { PedidoService } from 'src/app/shared/services/pedido.service';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss'],
})
export class DialogDetallesComponent {
  pedidosConDetalles: any[] | undefined;

  constructor(
    private pedidoService: PedidoService,
    public dialogRef: MatDialogRef<DialogDetallesComponent>
  ) {}

  ngOnInit() {
    this.pedidoService.getPedidosConDetalles().subscribe((data) => {
      this.pedidosConDetalles = data;
      console.log(data);
    });
  }

  obtenerCantidadPorProducto(pedido: any, productoId: number): number {
    const detalle = pedido.details.find(
      (d: any) => d.fk_product_id === productoId
    );
    return detalle ? detalle.quantity : 0;
  }

  obtenerNombreProducto(detalle: any): string {
    return detalle.product.name;
  }

  close(): void {
    this.dialogRef.close();
  }
}
