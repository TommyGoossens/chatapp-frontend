import {Pipe, PipeTransform} from '@angular/core';
import {ChatParticipant} from '../../modules/chat/models/ChatParticipant';

@Pipe({
  name: 'getSender',
  pure: true
})
export class GetSenderPipe implements PipeTransform {

  transform(email: any, participants: ChatParticipant[]): string {
    const index = participants.findIndex(p => p.email === email);
    return participants[index].firstName;

  }

}
