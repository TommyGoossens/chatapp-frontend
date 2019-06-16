import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RestService} from '../services/rest.service';
import {AuthenticationParticipant} from '../../modules/authentication/models/AuthenticationParticipant';
import {RegisterParticipant} from '../../modules/authentication/models/RegisterParticipant';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoggingService, LogLevel} from '../services/logging.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private restService: RestService) {
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !jwtHelper.isTokenExpired(token);
  }

  static getAuthenticatedUser(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }
    return null;
  }

  signIn(authParticipant: AuthenticationParticipant): Observable<any> {
    return this.restService.post<AuthenticationParticipant>('auth/signin', authParticipant).pipe(tap(res => {
      if (res && res.jwt) {
        localStorage.setItem('access_token', res.jwt);
        this.loginSubject.next(true);

      }
    }));
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


