import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private httpClient: HttpClient) {}

  public obtenerPedidos() {
    return this.httpClient.get<any>(`${environment.apiUrl}/orders/all`);
  }

  public getOrderByUser(user_id: number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/orders/user/${user_id}`
    );
  }

  public getPedidosConDetalles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/orders`);
  }

  public updateOrder(order: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/orders/update`, order);
  }

  public addOrder(order: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/orders/add`, order);
  }
}
