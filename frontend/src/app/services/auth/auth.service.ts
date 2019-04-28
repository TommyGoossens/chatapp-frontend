import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {RestService} from '../rest.service';
import {AuthenticationParticipant} from '../../models/AuthenticationParticipant';
import {RegisterParticipant} from '../../models/RegisterParticipant';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUserValue: Observable<string>;

  constructor(private restService: RestService) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('access_token')));
    if (this.currentUserSubject.value) {
      this.currentUserValue = this.currentUserSubject.asObservable();
    }
  }

  signIn(authParticipant: AuthenticationParticipant): Observable<any> {
    return this.restService.post<AuthenticationParticipant>('auth/signin', authParticipant).pipe(tap(res => {
      if (res && res.jwt) {
        localStorage.setItem('access_token', JSON.stringify(res.jwt));
        this.currentUserSubject.next(res);
      }
    }));
  }


  signUp(registerParticipant: RegisterParticipant): Observable<any> {
    return this.restService.post<AuthenticationParticipant>('auth/signup', registerParticipant);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUserValue = null;
  }
}


