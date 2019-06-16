// import {TestBed, async} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {AppComponent} from './app.component';
// import {AppModule} from './app.module';
// import {
//   MatButtonModule,
//   MatDialogModule,
//   MatFormFieldModule,
//   MatIconModule,
//   MatInputModule,
//   MatTabsModule,
//   MatToolbarModule
// } from '@angular/material';
// import {FormsModule} from '@angular/forms';
// import {AuthenticationModule} from './components/authentication-module/authentication.module';
// import {ChatModule} from './components/chat-module/chat.module';
// import {ProfileModule} from './components/profile-module/profile.module';
// import {AlertModule} from './components/alert-module/alert.module';
// import {SettingsComponent} from './components/settings/settings.component';
// import {NavbarComponent} from './components/navbar/navbar.component';
// import {DialogAddFriendComponent} from './models/dialog-add-friend/dialog-add-friend.component';
// import {HttpClientModule} from '@angular/common/http';
// import {AngularFireModule} from '@angular/fire';
// const firebaseConfig = {
//   apiKey: 'AIzaSyD-UAyA4pbDJavYzkBsXY8tQo_LkvQ_WG4',
//   authDomain: 'chatapp-68f21.firebaseapp.com',
//   databaseURL: 'https://chatapp-68f21.firebaseio.com',
//   projectId: 'chatapp-68f21',
//   storageBucket: 'chatapp-68f21.appspot.com',
//   messagingSenderId: '1044107528536',
//   appId: '1:1044107528536:web:07b875254d3ac9d6'
// };
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientModule,
//
//         AuthenticationModule,
//         ChatModule,
//         ProfileModule,
//         AlertModule,
//
//         MatTabsModule,
//         MatIconModule,
//         MatButtonModule,
//         MatToolbarModule,
//         FormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatDialogModule,
//         AngularFireModule.initializeApp(firebaseConfig)
//       ],
//       declarations: [
//         AppComponent,
//         SettingsComponent,
//         NavbarComponent,
//         DialogAddFriendComponent
//       ],
//     }).compileComponents();
//   }));
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//
//   it(`should have as title 'frontend'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('frontend');
//   });
//
//   it('should render title in a h1 tag', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontend!');
//   });
// });
