import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RestService} from '../rest.service';
import {AuthenticationParticipant} from '../../models/AuthenticationParticipant';
import {RegisterParticipant} from '../../models/RegisterParticipant';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private restService: RestService, private http: HttpClient) {
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !jwtHelper.isTokenExpired(token);
  }

  signIn(authParticipant: AuthenticationParticipant): Observable<any> {
    return this.restService.post<AuthenticationParticipant>('auth/signin', authParticipant).pipe(tap(res => {
      if (res && res.jwt) {
        localStorage.setItem('access_token', res.jwt);
        this.loginSubject.next(true);
      }
    }));
    // const data = {
    //   email: 'tommygoossens@ziggo.nl',
    //   password: '123456'
    // };
    // return this.http.post('http://localhost:8000/users', data);
  }

  signUp(registerParticipant: RegisterParticipant): Observable<any> {
    return this.restService.post<AuthenticationParticipant>('auth/signup', registerParticipant);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loginSubject.next(false);
  }

  private hasToken() {
    return !!localStorage.getItem('access_token');
  }
}


