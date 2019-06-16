import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAddFriendComponent} from './dialog-add-friend.component';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [DialogAddFriendComponent],
  entryComponents: [DialogAddFriendComponent],
  imports: [
    CommonModule,
    MatInputModule
  ]
})
export class AddFriendDialogModule {
}
