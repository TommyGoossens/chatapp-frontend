import {RegisterComponent} from './register.component';
import {async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';
import {LoginComponent} from '../login/login.component';
import {DebugElement} from '@angular/core';
import {AuthService} from '../../../../core/authentication/auth.service';
import {MockAuthService} from '../../../../core/mocks/mock-auth.service';
import {RestService} from '../../../../core/services/rest.service';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import {RegisterParticipant} from '../../models/RegisterParticipant';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {AppMaterialModule} from "../../../../../assets/material/app-material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {Test} from "tslint";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('Register Component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      providers: [],
      imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    });
    // const testBed = getTestBed();
    // restService = testBed.get(RestService);
    // authService = testBed.get(AuthService);
    //
    // authService = new AuthService(restService);
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })

  it('should set the button to disabled when everything is empty', () => {
    const compiled = fixture.componentInstance;
    const template: HTMLElement = fixture.nativeElement;

    const submitButton: HTMLButtonElement = template.querySelector('#submitRegister')

    expect(submitButton.disabled).toBeTruthy();
  })

  it('should set the button to disabled when all fields are filled but the password is too short', fakeAsync(() => {
    const compiled = fixture.componentInstance;
    const template: HTMLElement = fixture.nativeElement;
    const elFirstName = fixture.debugElement.nativeElement.querySelector('#firstName')
    const elLastName = fixture.debugElement.nativeElement.querySelector('#lastName')
    const elEmail = fixture.debugElement.nativeElement.querySelector('#email')
    const elPassword = fixture.debugElement.nativeElement.querySelector('#password')
    fixture.detectChanges();

    elFirstName.value = 'Tommy';
    elLastName.value = 'Goossens';
    elEmail.value = 'tommygoossens@ziggo.nl';
    elPassword.value = '';

    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });

    elFirstName.dispatchEvent(event);
    elLastName.dispatchEvent(event);
    elEmail.dispatchEvent(event);
    elPassword.dispatchEvent(event);

    tick()

    fixture.detectChanges();

    const submitButton: HTMLButtonElement = template.querySelector('#submitRegister')

    expect(submitButton.disabled).toBeTruthy();
  }))

  it('should set the button to enabled when all fields are filled', fakeAsync(() => {
    const compiled = fixture.componentInstance;
    const template: HTMLElement = fixture.nativeElement;
    const elFirstName = fixture.debugElement.nativeElement.querySelector('#firstName')
    const elLastName = fixture.debugElement.nativeElement.querySelector('#lastName')
    const elEmail = fixture.debugElement.nativeElement.querySelector('#email')
    const elPassword = fixture.debugElement.nativeElement.querySelector('#password')
    fixture.detectChanges();

    elFirstName.value = 'Tommy';
    elLastName.value = 'Goossens';
    elEmail.value = 'tommygoossens@ziggo.nl';
    elPassword.value = '123456';

    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });

    elFirstName.dispatchEvent(event);
    elLastName.dispatchEvent(event);
    elEmail.dispatchEvent(event);
    elPassword.dispatchEvent(event);

    tick()

    fixture.detectChanges();

    const submitButton: HTMLButtonElement = template.querySelector('#submitRegister')

    expect(submitButton.disabled).toBeFalsy();
  }))

});
