import {ChatMessage} from '../ChatMessage';
import {AuthService} from '../../../../core/authentication/auth.service';

export class ChatMessageDTO {
  sender: string = AuthService.getAuthenticatedUser();
  content: string;
  chatroomIdentifier: string;
  isReplyTo: ChatMessage;
  mediaURL: string;
}
