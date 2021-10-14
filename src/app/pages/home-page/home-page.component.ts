import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  socket: any;
  numberOfOnlineUsers: number | undefined;

  constructor() {
    this.socket = io();
   }

  ngOnInit(): void {
    this.numberOfOnlineUsers = 4;
    this.socket.on('numberOfOnlineUsers', (numberOfOnlineUsers: number | undefined) =>{
      this.numberOfOnlineUsers = numberOfOnlineUsers;
      console.log(numberOfOnlineUsers)
    })
  }

}
