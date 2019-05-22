export class ChatMessage {
  sender: string;
  message: string;
  date: string;
  read: boolean;
  constructor(sender: string, message: string, date: string, read: boolean) {
    this.sender = sender;
    this.message = message;
    this.date = date;
    this.read = read;
  }
}
