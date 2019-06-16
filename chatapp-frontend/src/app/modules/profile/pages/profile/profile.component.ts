import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {AlertService} from '../../../../shared/components/alert-module/service/alert.service';
import {UserProfile} from '../../../../models/UserProfile';
import {MatDialog} from '@angular/material';
import {DialogEditDetailsComponent} from './models/dialog-edit-details/dialog-edit-details.component';
import {DialogAddFriendComponent} from '../../../../shared/components/add-friend-dialog/dialog-add-friend.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  friendList: any[] = [];
  userProfile: UserProfile;

  selectedFiles: FileList;
  currentFileUpload: File;
  selectedFriend: string;

  constructor(private profileService: ProfileService, private alertService: AlertService, private dialog: MatDialog) {


  }

  ngOnInit() {
    this.profileService.retrieveProfileDetails().subscribe(data => {
      this.userProfile = new UserProfile(data);
      this.friendList = data.friends;
    });
  }


  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      this.alertService.error('Invalid format!');
    }
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    // this.profileService.uploadProfilePicture(this.currentFileUpload).pipe(tap(() => {
    //   this.retrieveProfilePicture();
    // })).subscribe();
    this.userProfile.profilePictureLocation = this.profileService.uploadProfilePicture(this.currentFileUpload);

    this.selectedFiles = undefined;
  }

  private addFriend(email: string) {
    this.profileService.addFriend(email).subscribe(
      data => {
        this.friendList = data;
      }
    );
  }

  private removeFriend() {
    this.profileService.removeFriend(this.selectedFriend).subscribe(
      data => {
        this.friendList = data;
        this.selectedFriend = null;
      }
    );
  }

  showEditProfileDialog(): void {
    const dialogRef = this.dialog.open(DialogEditDetailsComponent, {
      data: this.userProfile.toEditProfileDTO()
    });

    dialogRef.afterClosed().subscribe(newUserDetails => {
      if (!newUserDetails) {
        return;
      }

      this.profileService.updateProfile(newUserDetails).subscribe(data => {
        this.userProfile.firstName = data.firstName;
        this.userProfile.lastName = data.lastName;
        this.userProfile.dateOfBirth = data.dateOfBirth;

      });
    });
  }

  showAddFriendDialog(): void {
    const dialogRef = this.dialog.open(DialogAddFriendComponent);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.addFriend(response);
      }
    });
  }
}
