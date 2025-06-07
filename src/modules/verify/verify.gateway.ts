// verify.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // or FE origin during deployment
export class VerifyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const verificationId = client.handshake.query.verificationId as string;
    console.log('New connection with verificationId:', verificationId);

    if (!verificationId) {
      client.disconnect();
      return;
    }

    client.join(verificationId);
    console.log(`Client ${client.id} joined room ${verificationId}`);
  }

  notifyEmployer(verificationId: string, data: any) {
    this.server.to(verificationId).emit('verification_update', data);
  }
}
