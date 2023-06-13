import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map((res: any) => res));
  }

  checkSession(): Observable<boolean> {
    const email = sessionStorage.getItem('email');
    return of(!!email);
  }
}
