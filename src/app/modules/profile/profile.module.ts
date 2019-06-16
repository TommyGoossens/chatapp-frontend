import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './pages/profile/profile.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DialogEditDetailsComponent} from './pages/profile/models/dialog-edit-details/dialog-edit-details.component';
import {FormsModule} from '@angular/forms';
import {DialogAddFriendComponent} from '../../shared/components/add-friend-dialog/dialog-add-friend.component';
import {AppMaterialModule} from '../../../assets/material/app-material.module';
import {AddFriendDialogModule} from '../../shared/components/add-friend-dialog/add-friend-dialog.module';
import {profileRouting} from './profile.routing';

@NgModule({
  declarations: [ProfileComponent, DialogEditDetailsComponent],
  entryComponents: [DialogEditDetailsComponent, DialogAddFriendComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
    AppMaterialModule,
    AddFriendDialogModule,
    profileRouting
  ]
})
export class ProfileModule {
}
