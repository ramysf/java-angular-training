import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  AUTH_SERVER = 'http://localhost:8080/role';
  getRoles() {
    return this.http.get(`${this.AUTH_SERVER}/roles`);
  }

}
