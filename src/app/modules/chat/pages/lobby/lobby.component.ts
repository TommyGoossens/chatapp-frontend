import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../core/services/rest.service';
import {AlertService} from '../../../../shared/components/alert-module/service/alert.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {map, tap} from 'rxjs/operators';
import {ChatEventEmitterService} from '../../service/chat-event-emitter.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Chatroom} from '../../models/Chatroom';
import {MatDialog} from '@angular/material';
import {DialogNewChatComponent} from '../../components/dialog-new-chat/dialog-new-chat.component';
import {NewChatDTO} from '../../models/dto/NewChatDTO';
import {format, parse} from 'date-fns';
import {ChatMessage} from '../../models/ChatMessage';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  chatSessions: Chatroom[] = [];
  private stompClient;
  private selectedSession: string;

  constructor(private restService: RestService, private alertService: AlertService, private eventEmitterService: ChatEventEmitterService, private dialog: MatDialog) {
    this.initConnection();
    this.retrieveChats();
  }

  ngOnInit() {
  }

  /**
   *
   */
  private retrieveChats(): void {
    this.chatSessions = [];
    this.restService.get('lobby/chats').pipe(map((data: Chatroom[]) => {
      data.map(object => object.lastMessage = ChatMessage.serializeDate(object.lastMessage));
      this.chatSessions = data;
      this.sortOnTime();
    })).subscribe();
  }


  /**
   * Sends the current chatroom to the chat component
   * @param chatRoom object which contains the participants and session id, required for the websocket
   */
  private selectSession(chatRoom: Chatroom): void {
    this.selectedSession = chatRoom.chatroomIdentifier;
    this.eventEmitterService.retrieveMessagesFromSelectedLobbyParticipant(chatRoom);
  }

  /**
   * Initiates a connection with the backend for real time communication
   */
  private initConnection(): void {
    const ws = new SockJS('http://localhost:22505/wslobby');
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/openchats/lobby.${AuthService.getAuthenticatedUser()}`, (payload: any) => {
          if (payload.body) {
            this.handleMessage(JSON.parse(payload.body));
          }
        },
        error => {
          this.alertService.error('Could not connect to server. Please try again later');
        });
    });
  }

  /**
   * Method called whenever a message from the server is received
   * @param session containing entire chatroom
   */
  private handleMessage(session: Chatroom): void {
    session.lastMessage = ChatMessage.serializeDate(session.lastMessage);
    const index = this.chatSessions.findIndex(s => s.id === session.id);
    if (index === -1) {
      this.chatSessions.push(session);
      return;
    }
    this.chatSessions[index] = session;
    this.sortOnTime();
  }

  showNewChatDialog(): void {
    const dialogRef = this.dialog.open(DialogNewChatComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        console.log(response);
        this.startNewChat(response);
      }
    });
  }


  startNewChat(newChat: NewChatDTO) {
    this.restService.post('lobby/newchatroom', newChat).subscribe((response: Chatroom) => {
      this.selectSession(response);
    });
  }

  private sortOnTime() {
    this.chatSessions.sort((a, b) => {
      // @ts-ignore
      return b.lastMessage.time - a.lastMessage.time;
    });
  }
}
