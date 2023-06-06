import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private httpClient: HttpClient) {}

  public obtenerPedidos() {
    return this.httpClient.get<any>(`http://localhost:8080/api/orders/all`);
  }

  public getOrderByUser(user_id: number) {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/orders/user/${user_id}`
    );
  }
}