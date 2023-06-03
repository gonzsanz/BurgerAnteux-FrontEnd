import { Component } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Detalles {
  cantidad: number;
  producto: string;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent {
  pedidos: Pedido[] = [];
  detalles: Detalles[] = [
    {
      cantidad: 1,
      producto: 'Toledano',
    },
    {
      cantidad: 2,
      producto: 'Bocadillo',
    },
  ];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidoService.getOrderByUser(1).subscribe((pedidos) => {
      this.pedidos = pedidos.map((pedido: { date: string | number | Date }) => {
        const fechaFormateada = format(new Date(pedido.date), 'd MMMM yyyy', {
          locale: es,
        });
        return { ...pedido, date: fechaFormateada };
      });
    });
  }
}
