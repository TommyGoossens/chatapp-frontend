import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest.service';
import {AlertService} from '../../../services/alert/alert.service';
import {LobbyService} from '../../../services/lobby/lobby.service';
import {ChatMessage} from '../chat/models/ChatMessage';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  private openChats: ChatMessage[];

  constructor(private lobbyService: LobbyService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.lobbyService.getOpenChats().subscribe(
      data => {
        if (!data.error) {
          this.openChats = data;
        } else {
          this.alertService.error(data.error.message);
        }
      }
    );
  }

}
