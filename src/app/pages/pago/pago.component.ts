import { Component } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environment/environment';
import { ProductComponent } from '../product/product/product.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent {
  entregaADomicilio: boolean = false;
  direccion: string;
  direccionEditable: string;
  metodoPago: string;
  mostrarInputDireccion: boolean = false;
  servicioDomicilio: number = 1.5;
  public payPalConfig?: IPayPalConfig;
  total = '';

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {
    this.direccion = '';
    this.direccionEditable = '';
    this.metodoPago = 'efectivo';
  }

  ngOnInit(): void {
    this.initConfig();

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
                    value: this.total,
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
}
