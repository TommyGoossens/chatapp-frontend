import {ChatParticipant} from '../../../../models/ChatParticipant';
import {ChatMessage} from './ChatMessage';

export class Chat {
  participants: Map<ChatParticipant, boolean> = new Map<ChatParticipant, boolean>();
  messages: ChatMessage[] = [];
}
