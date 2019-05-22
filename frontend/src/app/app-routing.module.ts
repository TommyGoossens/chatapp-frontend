import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './components/settings/settings.component';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileWrapperComponent} from './components/profile-wrapper/wrapper/profile-wrapper.component';
import {ChatWrapperComponent} from './components/chat-wrapper/wrapper/chat-wrapper.component';
import {AuthGuard} from './guard/authguard/authguard.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'chat', component: ChatWrapperComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileWrapperComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
