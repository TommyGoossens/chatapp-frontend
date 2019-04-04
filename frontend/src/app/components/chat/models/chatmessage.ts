export class ChatMessage {
  private timestamp: Date;
  private sender: string;
  private message: string;

  constructor(timestamp: Date, sender: string, message: string) {
    this.timestamp = timestamp;
    this.sender = sender;
    this.message = message;
  }
}
