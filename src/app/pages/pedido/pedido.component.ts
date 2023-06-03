import { Component } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UserService } from 'src/app/shared/services/user.service';

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
  id: number | undefined;
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

  constructor(
    private pedidoService: PedidoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  async obtenerPedidos() {
    this.id = await this.getUsuario();
    if (this.id) {
      this.pedidoService.getOrderByUser(this.id).subscribe((pedidos) => {
        this.pedidos = pedidos.map(
          (pedido: { date: string | number | Date }) => {
            const fechaFormateada = format(
              new Date(pedido.date),
              'd MMMM yyyy',
              {
                locale: es,
              }
            );
            return { ...pedido, date: fechaFormateada };
          }
        );
      });
    }
  }

  private async getUsuario(): Promise<number | undefined> {
    const email = sessionStorage.getItem('email');
    if (email) {
      const usuario = await this.userService.getUser(email).toPromise();
      return usuario.user_id;
    }
    return undefined;
  }
}
