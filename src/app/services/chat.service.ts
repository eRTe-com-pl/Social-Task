import { Injectable } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { Observable, Subject } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Subject<any>;
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
    .connect()
    .map((response:any) => {
      return response;
    })
  }

  sendMsg(msg: any){
    this.messages.next(msg);
  }
}
