import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/users/add', user);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put('http://localhost:8080/api/users/update', user);
  }

  getUser(email: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/users/${email}`);
  }

  getStoredPassword() {
    return sessionStorage.getItem('password');
  }
}
