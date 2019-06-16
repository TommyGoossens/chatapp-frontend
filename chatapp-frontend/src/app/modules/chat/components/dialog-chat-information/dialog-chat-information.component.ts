import {Component, Inject, OnInit} from '@angular/core';
import {Chatroom} from '../../models/Chatroom';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogAddFriendComponent} from '../../../../shared/components/add-friend-dialog/dialog-add-friend.component';
import {RestService} from '../../../../core/services/rest.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {ChatParticipant} from '../../models/ChatParticipant';
import {UserProfile} from '../../../../models/UserProfile';

@Component({
  selector: 'app-dialog-chat-information',
  templateUrl: './dialog-chat-information.component.html',
  styleUrls: ['./dialog-chat-information.component.scss']
})
export class DialogChatInformationComponent implements OnInit {
  newChatRoomDetails: Chatroom = new Chatroom();
  chatParticipant: UserProfile;

  constructor(
    private dialogRef: MatDialogRef<DialogChatInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public currentChatRoom: Chatroom,
    private dialog: MatDialog,
    private restService: RestService) {
    this.newChatRoomDetails.copyChatroomDetails(currentChatRoom);
  }

  ngOnInit() {
    if (!this.currentChatRoom.groupChat) {
      const mail = this.getEmailFromParticipant();
      this.restService.get(`user/profile/${mail}`).subscribe(data => {
        this.chatParticipant = data;
      });


    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  showAddPersonDialog() {
    const dialogRef = this.dialog.open(DialogAddFriendComponent, {
      data: this.currentChatRoom,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((email: string) => {
      this.restService.put(`lobby/add/${this.currentChatRoom.chatroomIdentifier}`, email).subscribe(data => {
        this.currentChatRoom = data;
      });
    });
  }

  updateAdminStatus(email: string) {
    const index = this.newChatRoomDetails.admins.indexOf(email);
    switch (index) {
      case -1:
        this.newChatRoomDetails.admins.push(email);
        break;
      default:
        this.newChatRoomDetails.admins.splice(index, 1);
    }

    this.restService.put('lobby/updateroom', this.newChatRoomDetails).subscribe(data => {
      this.newChatRoomDetails = data;
    });
  }

  private getEmailFromParticipant(): string {
    let ownUsr: number = this.currentChatRoom.participants.findIndex(p => p.email === AuthService.getAuthenticatedUser());
    // tslint:disable-next-line:no-bitwise
    const otherUser = ownUsr ^= 1;
    return this.currentChatRoom.participants[otherUser].email;
  }

  getLoggedInUser(): string {
    return AuthService.getAuthenticatedUser();
  }

  save() {
    this.dialogRef.close(this.newChatRoomDetails);
  }
}
