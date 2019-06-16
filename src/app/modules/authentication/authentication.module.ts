import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {AlertModule} from '../../shared/components/alert-module/alert.module';
import {authRouting} from './authentication.routing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../../../assets/material/app-material.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    authRouting,
    CommonModule,
    AlertModule,
    AppMaterialModule,
    FormsModule
  ]
})
export class AuthenticationModule {
}
