import {Pipe, PipeTransform} from '@angular/core';
import {Chatroom} from '../../modules/chat/models/Chatroom';
import {AuthService} from '../../core/authentication/auth.service';

@Pipe({
  name: 'getImageURL',
  pure: true
})
export class GetImageURLPipe implements PipeTransform {

  transform(room: Chatroom): string {
    return this.getImageUrl(room);
  }

  getImageUrl(chatSession: Chatroom): string {
    if (chatSession.groupChat) {
      return chatSession.groupImageLocation;
    }
    if (chatSession.participants[1].email === AuthService.getAuthenticatedUser()) {
      return chatSession.participants[0].profilePictureLocation;
    }
    return chatSession.participants[1].profilePictureLocation;
  }

}
