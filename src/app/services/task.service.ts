import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Task } from "../models/task.model";
// import {  } from "module";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks               = this.socket.fromEvent<string[]>('tasks');
  numberOfUsersOnline = this.socket.fromEvent<Number>('numberOfUsersOnline');
  currentTask         = this.socket.fromEvent<Task>('task');

  constructor(private socket: Socket) { }
}
