import {Component, OnInit} from '@angular/core';
import {ChatMessage} from './models/ChatMessage';
import {Chat} from './models/Chat';
import {ChatParticipant} from '../../../models/ChatParticipant';
import {ReplyMessage} from './models/ReplyMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatTitle: string;
  senna: ChatParticipant = new ChatParticipant('senna@chat.com', 'Senna', 'Online');
  tommy: ChatParticipant = new ChatParticipant('tommygoossens@ziggo.nl', 'Tommy', 'Online');
  chat: Chat = new Chat();

  constructor() {
    this.chat.participants.set(this.tommy, false);
    this.chat.participants.set(this.senna, false);
    for (let i = 0; i < 5; i++) {
      let message = new ChatMessage('Tommy', 'Berichtje ontvangennnn', new Date().getDate().toString(), true);
      this.chat.messages.push(message);
      message = new ReplyMessage('Senna', 'Berichtje ontvangennnn', new Date().getDate().toString(), true, new ChatMessage('Tommy', 'Reply', new Date().getDate().toString(), true));
      this.chat.messages.push(message);
    }
    console.log('[Messages] : ', this.chat.messages);
  }

  ngOnInit() {
    if (!this.groupChat(this.chat.participants)) {
      this.chatTitle = 'Senna';
    } else {

      this.chatTitle = 'group';
    }
  }

  private groupChat(participants: Map<ChatParticipant, boolean>): boolean {
    return participants.size !== 2;
  }
}
