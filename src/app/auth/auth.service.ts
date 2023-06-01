import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
    return this.httpClient
      .post(`${this.api}/login`, { email, password })
      .pipe(map((res: any) => res));
  }

  checkSession(): Observable<boolean> {
    const email = sessionStorage.getItem('email');
    return of(!!email);
  }
}
