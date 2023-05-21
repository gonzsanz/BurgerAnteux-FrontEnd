import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/all`);
  }

  public getProductsByCategory(category: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/category/${category}`);
  }
}
