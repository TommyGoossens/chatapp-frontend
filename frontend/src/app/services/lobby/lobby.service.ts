import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {AlertService} from '../alert/alert.service';
import {Observable} from 'rxjs';
import {Chat} from '../../components/chat-wrapper/chat/models/Chat';
import {ChatMessage} from '../../components/chat-wrapper/chat/models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private restService: RestService) {

  }


  /**
   *
   */
  getOpenChats(): Observable<any> {
    return this.restService.get<ChatMessage[]>('lobby/chats');
  }
}
