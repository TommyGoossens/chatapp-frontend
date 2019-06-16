export class EditProfileDTO {
  firstName: string;
  lastName: string;

  dateOfBirth: string;

  public constructor(init?: Partial<EditProfileDTO>) {
    Object.assign(this, init);
  }
}
