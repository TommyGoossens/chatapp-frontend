import {Chat} from './Chat';
import {ChatParticipant} from '../../../../models/ChatParticipant';

export class GroupChat extends Chat {
  creator: ChatParticipant;
  dateCreated: string;
  groupImage: ImageBitmap;
  description: string;
}
