import {Pipe, PipeTransform} from '@angular/core';
import {Chatroom} from '../../modules/chat/models/Chatroom';
import {AuthService} from '../../core/authentication/auth.service';

@Pipe({
  name: 'getChatName',
  pure: true
})
export class GetChatNamePipe implements PipeTransform {

  transform(room: Chatroom): string {
    return this.getName(room);
  }

  getName(chatSession: Chatroom): string {
    if (chatSession.groupChat) {
      return chatSession.groupName;
    }
    if (chatSession.participants[1].email === AuthService.getAuthenticatedUser()) {
      return chatSession.participants[0].firstName;
    }
    return chatSession.participants[1].firstName;
  }

}
