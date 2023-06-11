import { Component } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CartService } from 'src/app/shared/services/cart.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environment/environment';
import { SuccesDialogComponent } from '../registro/succes-dialog/succes-dialog.component';
import { timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent {
  cart = this.cartService.getItems();
  entregaADomicilio: boolean = false;
  direccion: string;
  direccionEditable: string;
  metodoPago: string;
  mostrarInputDireccion: boolean = false;
  servicioDomicilio: number = 1.5;
  public payPalConfig?: IPayPalConfig;
  total = '';
  comentarios: string = '';
  userId: number = 0;
  load: boolean = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private pedidoService: PedidoService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.direccion = '';
    this.direccionEditable = '';
    this.metodoPago = 'efectivo';
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const user = sessionStorage.getItem('email');
    if (!user) {
      return;
    }
    this.userService.getUser(user).subscribe(
      (response) => {
        this.direccion = response.address;
        this.direccionEditable = this.direccion;
      },
      (error) => {
        console.log('Error al obtener la dirección del usuario:', error);
      }
    );
    this.cart = this.cartService.getItems();
    this.getComentarios();
    this.initConfig();
  }

  private initConfig(): void {
    this.total = this.getTotal().toFixed(2).toString();

    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.clientId,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.total,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.getTotalCart().toFixed(2).toString(),
                  },
                  shipping: {
                    currency_code: 'EUR',
                    value: this.entregaADomicilio
                      ? this.servicioDomicilio.toFixed(2).toString()
                      : '0.00',
                  },
                },
              },
              items: this.getItemList(),
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        window.scrollTo(0, 0);
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        console.log('data:', data);
        this.load = true;
        setTimeout(() => {
          this.finalizarPedido();
        }, 2000);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  onEntregaChange(entrega: string): void {
    this.entregaADomicilio = entrega === 'domicilio';
    if (!this.entregaADomicilio) {
      this.mostrarInputDireccion = false;
    }
    this.updatePayPalConfig();
  }

  onModificarDireccion(): void {
    this.mostrarInputDireccion = true;
  }

  guardarDireccion(): void {
    this.direccion = this.direccionEditable;
    this.mostrarInputDireccion = false;
  }

  getTotalCart(): number {
    return this.cartService.getTotal();
  }

  getTotal(): number {
    if (!this.entregaADomicilio) {
      return Number(this.getTotalCart().toFixed(2));
    } else {
      return Number((this.getTotalCart() + this.servicioDomicilio).toFixed(2));
    }
  }

  getItemList(): any[] {
    const items: any[] = [];

    this.cartService.getItems().forEach((product) => {
      const quantity = this.cartService.getQuantity(product.product_id);

      const item = {
        name: product.name,
        quantity: quantity.toString(),
        unit_amount: {
          currency_code: 'EUR',
          value: product.price.toString(),
        },
      };

      items.push(item);
    });

    return items;
  }

  getComentarios(): string {
    return this.comentarios;
  }

  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }

  updatePayPalConfig(): void {
    if (this.payPalConfig) {
      this.total = this.getTotal().toFixed(2).toString();
      this.payPalConfig.createOrderOnClient = (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.total,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.getTotalCart().toFixed(2).toString(),
                  },
                  shipping: {
                    currency_code: 'EUR',
                    value: this.entregaADomicilio
                      ? this.servicioDomicilio.toFixed(2).toString()
                      : '0.00',
                  },
                },
              },
              items: this.getItemList(),
            },
          ],
        };
    }
  }

  finalizarPedido(): void {
    console.log('finalizarPedido() called');
    const email = sessionStorage.getItem('email');
    this.userService.getUser(email!).subscribe(
      (response) => {
        console.log('Usuario obtenido', response);
        const user = response;

        const orderData = {
          user: user,
          address: this.direccion,
          comments: this.comentarios,
          date: new Date(),
          state: 'IN_PROCESS',
          details: this.cartService.getItems().map((item) => ({
            product: item,
            quantity: this.getQuantity(item.product_id),
          })),
        };

        this.pedidoService.addOrder(orderData).subscribe(
          (response) => {
            console.log('Pedido agregado', response);
            const dialogRef = this.dialog.open(SuccesDialogComponent, {
              disableClose: true,
              data: { message: 'Pedido realizado correctamente' },
            });
            this.load = false;
            timer(2000).subscribe(() => {
              this.cartService.clearCart();
              dialogRef.close();
              this.router.navigate(['/carta']);
            });
          },
          (error) => {
            console.log('Error al agregar pedido', error);
          }
        );
      },
      (error) => {
        console.log('Error al obtener usuario', error);
      }
    );
  }
}
