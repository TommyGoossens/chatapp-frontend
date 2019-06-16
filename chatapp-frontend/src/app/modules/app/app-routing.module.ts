import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChatWrapperComponent} from '../chat/pages/wrapper/chat-wrapper.component';
import {AuthGuard} from '../../core/guards/authguard.guard';
import {ProfileComponent} from '../profile/pages/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'auth', loadChildren: '../authentication/authentication.module#AuthenticationModule'},
  {path: 'chat', canActivate: [AuthGuard], loadChildren: '../chat/chat.module#ChatModule'},
  {path: 'profile', canActivate: [AuthGuard], loadChildren: '../profile/profile.module#ProfileModule'},

  {path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
