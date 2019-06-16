import {format, parse} from 'date-fns';
import {Chatroom} from './Chatroom';

export class ChatMessage {
  id: bigint;
  sender: string;
  content: string;
  time: Date;
  formattedDate: string;
  isReplyTo: ChatMessage;
  mediaURL: string;

  static serializeDate(data: ChatMessage): ChatMessage {
    if (!data) {
      return;
    }
    console.log(data);
    const message = Object.assign(new this(), data);
    message.time = parse(data.time);
    message.formattedDate = format(message.time, 'hh:mm DD/MM/YYYY');
    return message;
  }
}


