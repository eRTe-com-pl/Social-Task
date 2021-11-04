import { Injectable } from '@angular/core';
// import { io } from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket :any;//

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io(environment.ws_url);

    let observable = new Observable(observer => {
      this.socket.on('message', (data: unknown) => {
        console.log("Received message forom Websocket Server")
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('messagea', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable)
  }
}
