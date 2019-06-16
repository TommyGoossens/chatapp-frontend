import {Component, Input, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatDialog} from '@angular/material';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Chatroom} from '../../models/Chatroom';
import {ChatMessageDTO} from '../../models/dto/ChatMessageDTO';
import {ChatMessage} from '../../models/ChatMessage';
import {RestService} from '../../../../core/services/rest.service';
import {AlertService} from '../../../../shared/components/alert-module/service/alert.service';
import {ChatEventEmitterService} from '../../service/chat-event-emitter.service';
import {DialogChatInformationComponent} from '../../components/dialog-chat-information/dialog-chat-information.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentChat: Chatroom;
  composedMessage: ChatMessageDTO = new ChatMessageDTO();
  messages: ChatMessage[];
  selectedMediaFile: File;
  stompClient;


  private storage;
  private storageRef;

  constructor(private restService: RestService,
              private alertService: AlertService,
              private eventEmitterService: ChatEventEmitterService,
              private dialog: MatDialog,
              private af: AngularFirestore) {
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
  }

  ngOnInit() {
    if (this.eventEmitterService.subscriptionForChat === undefined) {
      this.eventEmitterService.subscriptionForChat = this.eventEmitterService.invokeLobbyRetrieveMessagesFunction
        .subscribe((selectedSession: Chatroom) => {
          this.handleSessionPassedByLobby(selectedSession);
          this.composedMessage.chatroomIdentifier = selectedSession.chatroomIdentifier;
        });
    }
  }

  /**
   * Method called from the lobby component, to pass the relevant data to the chat component.
   * After successfully retrieving the messages, a websocket connection is initialized
   * @param selectedSession is a dto containing the session ID and the email of the selected user.
   */
  public handleSessionPassedByLobby(selectedSession: Chatroom) {
    this.currentChat = selectedSession;
    this.restService.get(`chat/chat/${selectedSession.chatroomIdentifier}`).subscribe(
      data => {
        this.messages = data;
        this.initWebsocketConnection(selectedSession.chatroomIdentifier);
      }
    );
  }

  /**
   * Establish a websocket connection to the server. Session is required.
   * Sets the callback action whenever a chatSession is received: handleMessage()
   * @param sessionId sessionId received from the lobby component
   */
  private initWebsocketConnection(sessionId: string): void {
    const ws = new SockJS('http://localhost:22504/wschat');
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/reply/chat.${sessionId}`, payload => {
          if (payload) {
            this.messages.push(JSON.parse(payload.body));
          }
        },
        (error: any) => {
          this.onError(error);
        });
    });
  }

  /**
   * Sends a chatSession over the websocket connection.
   * The payload that gets send is the model MessageDTO
   */
  public sendMessage() {
    if (this.composedMessage.content && this.stompClient) {

      if (this.selectedMediaFile) {
        this.uploadMediaFile(this.selectedMediaFile);
      }
      if (!this.selectedMediaFile) {
        this.stompClient.send(`/app/chat.${this.currentChat.chatroomIdentifier}`, {}, JSON.stringify(this.composedMessage));
        this.composedMessage = new ChatMessageDTO();
      }
    }
  }

  processMediaFile(event): void {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      const selectedFiles: FileList = event.target.files;
      this.selectedMediaFile = selectedFiles.item(0);
    } else {
      this.alertService.error('Invalid format!');
    }
  }

  /**
   *
   */
  private uploadMediaFile(media: File) {
    const fileRef = this.storageRef.child(`media/${this.currentChat.chatroomIdentifier}/${media.name}`);

    fileRef.put(media).then(snapshot => {
      fileRef.getDownloadURL().then(URL => {
        this.composedMessage.mediaURL = URL;
        this.selectedMediaFile = null;
        this.sendMessage();
      });
    });
  }

  /**
   * Sets the selected message on which the user will reply
   * The selected message is received from the child component 'chat-message-component'
   * @param message ChatMessage object which will be send to the server unless cancelled
   */
  private selectMessage(message: ChatMessage): void {
    this.composedMessage.isReplyTo = message;
    console.log(message);
  }

  /**
   *
   */
  private onError(error: any) {
    this.alertService.error(error);
  }

  showChatInformation() {
    const dialogRef = this.dialog.open(DialogChatInformationComponent, {
      data: this.currentChat,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(savedRoom => {
      this.restService.put('lobby/updateroom', savedRoom).subscribe((data: Chatroom) => {
        this.currentChat = data;
      });
    });
  }
}
