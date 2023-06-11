import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetallesService {
  constructor(private httpClient: HttpClient) {}

  public getDetailsByOrder(order_id: number) {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/details/${order_id}`
    );
  }

  public addDetail(detail: any) {
    return this.httpClient.post<any>(
      `http://localhost:8080/api/details/add`,
      detail
    );
  }

  public getOrderDetailsByUser(order_id: number, user_id: number) {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/details/${order_id}/${user_id}`
    );
  }
}
