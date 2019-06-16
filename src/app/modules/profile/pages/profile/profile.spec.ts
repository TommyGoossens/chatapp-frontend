import {ProfileComponent} from "./profile.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DialogEditDetailsComponent} from "../../models/dialog-edit-details/dialog-edit-details.component";
import {AddFriendDialogModule} from "../../../../shared/components/add-friend-dialog/add-friend-dialog.module";
import {DialogAddFriendComponent} from "../../../../shared/components/add-friend-dialog/dialog-add-friend.component";
import {CommonModule} from "@angular/common";
import {AppMaterialModule} from "../../../../../assets/material/app-material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestore} from "@angular/fire/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyD-UAyA4pbDJavYzkBsXY8tQo_LkvQ_WG4',
  authDomain: 'chatapp-68f21.firebaseapp.com',
  databaseURL: 'https://chatapp-68f21.firebaseio.com',
  projectId: 'chatapp-68f21',
  storageBucket: 'chatapp-68f21.appspot.com',
  messagingSenderId: '1044107528536',
  appId: '1:1044107528536:web:07b875254d3ac9d6'
};

describe('Profile component', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        DialogEditDetailsComponent,
        DialogAddFriendComponent
      ],
      providers: [AngularFirestore],
      imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
