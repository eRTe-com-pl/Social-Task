import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';
import { connect } from 'http2';
import { environment } from "../../environments/environment";
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;//


  constructor() { }

  connect(): Rx.Subject<MessageEvent>{
    this.socket= io(environment.ws_url);
  }
}
