import { Injectable } from '@nestjs/common';
import { Socket } from "socket.io";

@Injectable()
export class ChatService {
  constructor() {
  }

  sendNewMessage(client: Socket, message: string, userRoomId: string) {

  }

  likeMessage(client: Socket, message: string, likeFlag: boolean, userRoomId: string) {

  }

  deleteMessage() {

  }

  deleteChat() {

  }
}
