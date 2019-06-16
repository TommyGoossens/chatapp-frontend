import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {Chatroom} from '../models/Chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatEventEmitterService {
  invokeLobbyRetrieveMessagesFunction = new EventEmitter();
  subscriptionForChat: Subscription;

  constructor() {
  }

  public retrieveMessagesFromSelectedLobbyParticipant(selectedUser: Chatroom) {
    this.invokeLobbyRetrieveMessagesFunction.emit(selectedUser);
  }
}
