import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import * as WebSocket from 'ws';

@WebSocketGateway(3333,{
  // namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  // server: Server;
  server: WebSocket.Server;

  @SubscribeMessage('events')
  async handlerEvent(@MessageBody() data: string): Promise<string> {
    console.log('DATA:', data);
    setTimeout(() => {
      // console.log(this.server.clients);
      this.server.clients.forEach(function each(client) {
        const response = JSON.stringify(client, null, 4);
        client.send(response);
        // console.log(WebSocket);
        // console.log(client);
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
        // if (client.readyState === WebSocket.OPEN) {
        //   client.send(JSON.stringify({
        //     type: 'event',
        //     message: 'hello world 2'
        //   }));
        // }
      });
    }, 1000);
    return data;
  }

// @SubscribeMessage('events2')
//   onEvent(client: any, data: any): Observable<WsResponse<number>> {
//     return from([1,2,3]).pipe(map(item => ({ event: 'events', data: item })));
// }

  // @SubscribeMessage('events')
  // async handlerEvent(@MessageBody() data: string): Promise<any> {
  //   console.log('DATA:', data);
  //   return data;
  //   // this.server.emit()
  // }
}