import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { ChatService } from "./chat.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly chatService: ChatService
  ) {
  }

  afterInit(server: Server) {
    return console.log('Init of chat-socket server');
  }

  handleConnection(client: Socket, userRoomId: number): any {
    return this.logger.log(`Client connection ${client.id} to ${userRoomId}`);
  }

  @SubscribeMessage('newMessage')
  sendNewMessage(client: Socket, message: string, userRoomId: string) {
    return this.chatService.sendNewMessage(client, message, userRoomId)
  }

  @SubscribeMessage('likeUserMessage')
  likeUserMessage(client: Socket, messageId: number, likeFlag: boolean, userRoomId: string) {

  }

  @SubscribeMessage('deleteMessage')
  deleteMessage(client: Socket, messageId: number, userRoomId: string) {

  }

  @SubscribeMessage('deleteChat')
  deleteChat(client: Socket, userId: string) {

  }

  // @SubscribeMessage('blacklistUser')
  // blacklistUser(client: Socket, userId: string, banFlag) { //todo добавить в основной сокет
  //   return this.chatService.blackListUser(userId, banFlag)
  // }

  handleDisconnect(client: Socket) {
    return console.log(`${client.id} disconnected`)
  }
}
