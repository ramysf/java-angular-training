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
          const decodedToken = this.helper.decodeToken(res['token']);
          if (decodedToken['sub'] !== null && decodedToken['scopes'] !== null) {
            localStorage.setItem('ACCESS_TOKEN', res['token']);
            localStorage.setItem('EXPIRES_IN', decodedToken['exp']);
            this.authSubject.next(true);
          }
        }
      })
    );
  }


  signOut() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.authSubject.next(false);
  }

  isAuthenticated() {
    console.log(this.authSubject.asObservable());
    // return this.authSubject.asObservable();
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
}
