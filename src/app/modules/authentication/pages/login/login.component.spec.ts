import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from "../../../../core/authentication/auth.service";
import {AppMaterialModule} from "../../../../../assets/material/app-material.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AppMaterialModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        AuthService,

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the button to enabled when all fields are filled', fakeAsync(() => {
    const compiled = fixture.componentInstance;
    const template: HTMLElement = fixture.nativeElement;

    const elEmail = fixture.debugElement.nativeElement.querySelector('#email')
    const elPassword = fixture.debugElement.nativeElement.querySelector('#password')

    fixture.detectChanges();

    elEmail.value = 'tommygoossens@ziggo.nl';
    elPassword.value = '123456';

    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });

    elEmail.dispatchEvent(event);
    elPassword.dispatchEvent(event);

    tick()

    fixture.detectChanges();

    const submitButton: HTMLButtonElement = template.querySelector('#submitSignIn')

    expect(submitButton.disabled).toBeFalsy();
  }))


  it('should get a jwt from the backend')
});
