import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent { 
  socket;
  // numberOfOnlineUsers: number;

  constructor() {
    this.socket = io();
  }

}
