import {RegisterComponent} from './register.component';
import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {LoginComponent} from '../login/login.component';
import {DebugElement} from '@angular/core';
import {AuthService} from '../../../../core/authentication/auth.service';
import {MockAuthService} from '../../../../core/mocks/mock-auth.service';
import {RestService} from '../../../../core/services/rest.service';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import {RegisterParticipant} from '../../models/RegisterParticipant';

describe('Register', () => {
  // let component: RegisterComponent = new RegisterComponent(new AuthService(new RestService(new HttpClient(), new )), Moc);
  let authService;
  let restService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        MockAuthService,
        RestService
      ],
      imports: [
        HttpClientModule
      ]
    });
    const testBed = getTestBed();
    restService = testBed.get(RestService);
    authService = testBed.get(AuthService);

    authService = new AuthService(restService);
  });

  it('should register the user', () => {
    const registerParticipant: RegisterParticipant = new RegisterParticipant();
    registerParticipant.firstname = 'Tommy';
    registerParticipant.lastname = 'Goossens';
    registerParticipant.email = 'tommygoossens@ziggo.nl';
    registerParticipant.password = '12412312';

    // authService.;
    expect(registerParticipant.firstname).toBe('Tommyhahaha');
  });


  it('shoud not register te user', () => {

  });
});
