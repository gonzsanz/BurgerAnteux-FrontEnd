import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UserService } from 'src/app/shared/services/user.service';
import { DetallesService } from 'src/app/shared/services/detalles.service';

interface Detalle {
  cantidad: number;
  producto: string;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  user_id!: number;
  order_id!: number;
  user_orders: any[] = [];
  pedidos: Pedido[] = [];
  detalles!: any[] | undefined;
  listaDetalles: Detalle[] | undefined;

  constructor(
    private userService: UserService,
    private pedidoService: PedidoService,
    private detallesService: DetallesService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUser();
  }

  getUser() {
    const email = sessionStorage.getItem('email');
    this.userService.getUser(email!).subscribe((user) => {
      this.user_id = user.user_id;
      console.log(this.user_id);
      this.getOrders();
    });
  }

  getOrders() {
    this.pedidoService.getOrderByUser(this.user_id).subscribe((orders) => {
      this.user_orders = orders;
      console.log(this.user_orders);
    });
  }

  getColorForState(state: string): string {
    if (state === 'DELIVERED') {
      return 'orange'; // Cambia el color según tus necesidades
    } else if (state === 'READY') {
      return 'green'; // Cambia el color según tus necesidades
    } else if (state === 'IN_PROCESS') {
      return 'red'; // Cambia el color según tus necesidades
    } else {
      return 'black'; // Color predeterminado si el estado no coincide con ninguno de los anteriores
    }
  }
}
