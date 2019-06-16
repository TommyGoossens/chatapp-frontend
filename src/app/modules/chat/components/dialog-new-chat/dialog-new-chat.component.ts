import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NewChatDTO} from '../../models/dto/NewChatDTO';
import {RestService} from '../../../../core/services/rest.service';
import {AuthService} from '../../../../core/authentication/auth.service';


@Component({
  selector: 'app-dialog-new-chat',
  templateUrl: './dialog-new-chat.component.html',
  styleUrls: ['./dialog-new-chat.component.scss']
})
export class DialogNewChatComponent implements OnInit {
  chatRoom: NewChatDTO = new NewChatDTO();
  privateChatMail: string;

  constructor(public dialogRef: MatDialogRef<DialogNewChatComponent>, private restService: RestService) {
  }

  ngOnInit() {
  }


  countParticipants() {
    console.log(this.chatRoom.participants);
  }

  emptyParticipants() {
    this.chatRoom.participants = [];
  }

  confirmChat(): void {
    if (!this.chatRoom.groupChat) {
      this.chatRoom.participants.push(this.privateChatMail);
    }
    this.chatRoom.participants.push(AuthService.getAuthenticatedUser());
    this.dialogRef.close(this.chatRoom);
  }
}
