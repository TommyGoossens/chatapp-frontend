import {Component, Input, OnInit} from '@angular/core';
import {ChatParticipant} from '../../../../../models/ChatParticipant';
import {Time} from '@angular/common';
import {ChatMessage} from '../ChatMessage';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  @Input() replyMessage: ChatMessage;

  constructor() {
  }

  ngOnInit() {
  }

}
