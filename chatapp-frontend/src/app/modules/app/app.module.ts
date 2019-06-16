import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {ErrorInterceptor} from '../../core/interceptors/error.interceptor';
import {JwtInterceptor} from '../../core/interceptors/jwt.interceptor';
import {ChatModule} from '../chat/chat.module';
import {AuthenticationModule} from '../authentication/authentication.module';
import {AlertModule} from '../../shared/components/alert-module/alert.module';
import {ProfileModule} from '../profile/profile.module';
import {DialogAddFriendComponent} from '../../shared/components/add-friend-dialog/dialog-add-friend.component';
import {FormsModule} from '@angular/forms';
// import {AdminStatusPipe} from './components/chat-module/pipes/admin-status-pipe.pipe';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppMaterialModule} from '../../../assets/material/app-material.module';
import {AddFriendDialogModule} from '../../shared/components/add-friend-dialog/add-friend-dialog.module';

const firebaseConfig = {
  apiKey: 'AIzaSyD-UAyA4pbDJavYzkBsXY8tQo_LkvQ_WG4',
  authDomain: 'chatapp-68f21.firebaseapp.com',
  databaseURL: 'https://chatapp-68f21.firebaseio.com',
  projectId: 'chatapp-68f21',
  storageBucket: 'chatapp-68f21.appspot.com',
  messagingSenderId: '1044107528536',
  appId: '1:1044107528536:web:07b875254d3ac9d6'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AppMaterialModule,
    ChatModule,
    ProfileModule,
    AlertModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
