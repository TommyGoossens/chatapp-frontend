export class ChatParticipant {
  email: string;
  name: string;
  status: string;
  profileImage: ImageBitmap;


  constructor(email: string, name: string, status: string) {
    this.email = email;
    this.name = name;
    this.status = status;
  }
}
