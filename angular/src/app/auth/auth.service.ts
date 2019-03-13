import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {JwtResponse} from '../model/jwt-response';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER = 'http://localhost:8080/user';
  authSubject = new BehaviorSubject(false);
  helper = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
  }

  signUp(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/signup`, user).pipe(
      tap((res: JwtResponse) => {
        if (res['id'] !== null) {
          this.authSubject.next(true);
        }
      })
    );
  }

  singIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res['token'] !== null) {
          this.saveToken(res['token']);
          this.authSubject.next(true);
        }
      })
    );
  }


  signOut() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.authSubject.next(false);
  }

  saveToken(token: string) {
    if (typeof token !== 'undefined' && token !== null) {
      const decodedToken = this.helper.decodeToken(token);
      if (decodedToken['sub'] !== null && decodedToken['scopes'] !== null) {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('EXPIRES_IN');
        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('EXPIRES_IN', decodedToken['exp']);
        }
      }
    }

  public getToken(): string {
    return localStorage.getItem('ACCESS_TOKEN');
  }
  isAuthenticated() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
}
