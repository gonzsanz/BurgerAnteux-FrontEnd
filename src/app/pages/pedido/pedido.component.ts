import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UserService } from 'src/app/shared/services/user.service';
import { DetallesService } from 'src/app/shared/services/detalles.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  user_id!: number;
  order_id!: number;
  pedidos = [];
  details = {};

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
      this.pedidos = orders;
      for (let order of orders) {
        this.order_id = order.order_id;
        console.log(this.order_id);
        this.detallesService
          .getOrderDetailsByUser(this.order_id, this.user_id)
          .subscribe((details) => {
            this.details = details;
          });
        console.log(this.details);
      }

      // console.log(this.pedidos);
    });
  }
}
