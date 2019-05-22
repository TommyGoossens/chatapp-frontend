import {ChatMessage} from './ChatMessage';

export class ReplyMessage extends ChatMessage {
  sender: string;
  message: string;
  date: string;
  read: boolean;
  originalMessage: ChatMessage;


  constructor(sender: string, message: string, date: string, read: boolean, originalMessage: ChatMessage) {
    super(sender, message, date, read);
    this.sender = sender;
    this.message = message;
    this.date = date;
    this.read = read;
    this.originalMessage = originalMessage;
  }
}
