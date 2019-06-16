import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatWrapperComponent} from './pages/wrapper/chat-wrapper.component';
import {ChatComponent} from './pages/chat/chat.component';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ChatEventEmitterService} from './service/chat-event-emitter.service';
import {GetChatNamePipe} from '../../shared/pipes/get-chat-name.pipe';
import {DialogNewChatComponent} from './components/dialog-new-chat/dialog-new-chat.component';
import {FormsModule} from '@angular/forms';
import {GetImageURLPipe} from '../../shared/pipes/get-image-url.pipe';
import {DialogChatInformationComponent} from './components/dialog-chat-information/dialog-chat-information.component';
import {DialogAddFriendComponent} from '../../shared/components/add-friend-dialog/dialog-add-friend.component';
import {AdminStatusPipe} from '../../shared/pipes/admin-status-pipe.pipe';
import {GetSenderPipe} from '../../shared/pipes/get-sender.pipe';
import {AppMaterialModule} from '../../../assets/material/app-material.module';
import {AddFriendDialogModule} from '../../shared/components/add-friend-dialog/add-friend-dialog.module';
import {chatRouting} from './chat.routing';


@NgModule({
  declarations: [
    ChatWrapperComponent,
    ChatComponent,
    LobbyComponent,
    ChatMessageComponent,

    DialogNewChatComponent,
    DialogChatInformationComponent,

    GetChatNamePipe,
    GetImageURLPipe,
    AdminStatusPipe,
    GetSenderPipe
  ],
  entryComponents: [DialogNewChatComponent, DialogChatInformationComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    AppMaterialModule,
    FormsModule,
    AddFriendDialogModule,
    chatRouting
  ],
  exports: [],
  providers: [ChatEventEmitterService]
})
export class ChatModule {
}
