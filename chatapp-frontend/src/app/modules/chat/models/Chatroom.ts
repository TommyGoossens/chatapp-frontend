import {ChatParticipant} from './ChatParticipant';
import {ChatMessage} from './ChatMessage';

export class Chatroom {
  id: bigint;
  participants: ChatParticipant[] = [];
  admins: string[] = [];
  lastMessage: ChatMessage;
  chatroomIdentifier: string;
  groupChat: boolean;
  groupName: string;
  groupDescription: string;
  groupImageLocation: string;


  public copyChatroomDetails(existingRoom: Chatroom) {
    this.id = existingRoom.id;
    this.participants = existingRoom.participants;
    this.admins = existingRoom.admins;
    this.lastMessage = existingRoom.lastMessage;
    this.chatroomIdentifier = existingRoom.chatroomIdentifier;
    this.groupChat = existingRoom.groupChat;
    this.groupName = existingRoom.groupName;
    this.groupDescription = existingRoom.groupDescription;
    this.groupImageLocation = existingRoom.groupImageLocation;
  }
}
