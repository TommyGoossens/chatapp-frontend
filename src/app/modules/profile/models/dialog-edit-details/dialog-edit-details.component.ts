import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditProfileDTO} from './EditProfileDTO';

@Component({
  selector: 'app-dialog-edit-details',
  templateUrl: 'dialog-edit-details.component.html',
})
export class DialogEditDetailsComponent {
  newDetails: EditProfileDTO = new EditProfileDTO();

  constructor(
    private dialogRef: MatDialogRef<DialogEditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public currentProfile: EditProfileDTO) {
    this.newDetails.firstName = currentProfile.firstName;
    this.newDetails.lastName = currentProfile.lastName;
    this.newDetails.dateOfBirth = currentProfile.dateOfBirth;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
