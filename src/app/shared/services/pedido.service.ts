import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public getPedidosConDetalles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/orders`);
  }

  public updateOrder(order: any): Observable<any> {
    return this.httpClient.put(
      `http://localhost:8080/api/orders/update`,
      order
    );
  }

  public addOrder(order: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/api/orders/add`, order);
  }
}
