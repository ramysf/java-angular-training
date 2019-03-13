import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class DasboardService {

  constructor(private http: HttpClient) { }
  AUTH_SERVER = 'http://localhost:8080/user';
  getUsers() {
    return this.http.get(`${this.AUTH_SERVER}/users`);
  }
  removeUser(userId: number) {
    return this.http.get(`${this.AUTH_SERVER}/delete/${userId}`);
  }
}
