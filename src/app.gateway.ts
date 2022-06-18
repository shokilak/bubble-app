import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    return console.log('App-socket server init')
  }

  @SubscribeMessage('matchEvent')
  handleMessage(client: Socket, userId: number) {
    return console.log(`Socket ${client.id} was liked by ${userId}`)
  }

  handleConnection(client: Socket, ...args: any[]): any {
    return console.log(`Socket ${client.id} connected to app-socket`)
  }

  handleDisconnect(client: Socket): any {
    return console.log(`Socket ${client.id} disconnected from app-socket`)
  }
}
