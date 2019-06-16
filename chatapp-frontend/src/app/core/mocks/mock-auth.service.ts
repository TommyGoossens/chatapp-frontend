import {BehaviorSubject, Observable} from 'rxjs';
import {RestService} from '../services/rest.service';
import {RegisterParticipant} from '../../modules/authentication/models/RegisterParticipant';
import {AuthenticationParticipant} from '../../modules/authentication/models/AuthenticationParticipant';
import {HttpResponse} from '@angular/common/http';

export class MockAuthService {
  loginSubject = new BehaviorSubject<boolean>(false);

  mockUser: AuthenticationParticipant = {
    email: 'tommygoossens@ziggo.nl',
    password: '123456'
  };


  mockParticipants: AuthenticationParticipant[] = [
    this.mockUser
  ];

  constructor(private restService: RestService) {

  }


  signIn(participant: AuthenticationParticipant) {
    if (this.mockParticipants.find(p => p.email === participant.email).password === participant.password) {
      return new HttpResponse({status: 200, body: 'JWT KEY'});
    }

    if (this.mockParticipants.find(p => p.email === participant.email).password !== participant.password) {
      return new HttpResponse({status: 422, body: '[Incorrect password]'});
    }


  }

  signUp(participant: RegisterParticipant) {
    if (this.mockParticipants.find(p => p.email === participant.email)) {
      return new HttpResponse({status: 409, body: '[Duplicate entitybu]'});
    }
  }

  logout() {

  }

  private hasToken() {

  }
}
