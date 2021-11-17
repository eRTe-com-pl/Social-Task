import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Task } from "../models/task.model";
// import {  } from "module";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  currentTask         = this.socket.fromEvent<Task>('task');
  tasks               = this.socket.fromEvent<Task[]>('tasks');
  numberOfUsersOnline = this.socket.fromEvent<number>('numberOfUsersOnline');

 
  constructor(private socket: Socket) {
    // console.log(this.tasks)
   }

  getTask(id: string){
    this.socket.emit('getTask', id);
  }

  newTask(){
    this.socket.emit('addTask', {id: this.taskId(), task: 'asd'});
  }

  editTask(task: Task) {
    this.socket.emit('edittask', task);
  }

  private taskId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
