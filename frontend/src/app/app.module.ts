import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LobbyComponent} from './components/chat-wrapper/lobby/lobby.component';
import {ChatComponent} from './components/chat-wrapper/chat/chat.component';
import {ProfileComponent} from './components/profile-wrapper/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SettingsComponent} from './components/settings/settings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component';
import {
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDividerModule, MatTableModule
} from '@angular/material';
import {FriendsComponent} from './components/profile-wrapper/friends/friends.component';
import {ProfileWrapperComponent} from './components/profile-wrapper/wrapper/profile-wrapper.component';
import {ChatWrapperComponent} from './components/chat-wrapper/wrapper/chat-wrapper.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LayoutModule} from '@angular/cdk/layout';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './components/alert/alert.component';
import {ChatMessageComponent} from './components/chat-wrapper/chat/models/chat-message/chat-message.component';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import { ReplyMessageComponent } from './chat-wrapper/chat/models/reply-message/reply-message.component';

// import { AuthguardComponent } from './guard/authguard/authguard.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    ChatComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    SettingsComponent,
    NavbarComponent,
    FriendsComponent,
    ProfileWrapperComponent,
    ChatWrapperComponent,
    AlertComponent,
    ChatMessageComponent,
    ReplyMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  exports: [
    MatTabsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
