import {EditProfileDTO} from '../modules/profile/pages/profile/models/dialog-edit-details/EditProfileDTO';

export class UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  profilePictureLocation: string;


  constructor(json: any) {
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.dateOfBirth = json.dateOfBirth;
    this.profilePictureLocation = json.profilePictureLocation;
  }

  public toEditProfileDTO(): EditProfileDTO {
    return new EditProfileDTO({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth
    });
  }
}
