import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from '../../models/ChatMessage';
import {Chatroom} from '../../models/Chatroom';
import {format, parse} from 'date-fns';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  @Input() chatRoom: Chatroom;
  @Output() isReplying = new EventEmitter<ChatMessage>();

  constructor() {
  }

  ngOnInit() {
    this.message = ChatMessage.serializeDate(this.message);
  }

  selectMessageToReply() {
    this.isReplying.emit(this.message);
  }

}
