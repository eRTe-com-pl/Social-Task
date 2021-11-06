import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from "rxjs";

import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks!: Observable<Task[]> ;
  currentTask : Task = {id:'', task: '', usersOnlineInTask: undefined} ;
  private _taskSub!: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.tasks;

    // console.log(this.tasks)
    // this.currentTask = this.taskService.currentTask.subscribe(tsk => this.currentTask = tsk);
    this._taskSub = this.taskService.currentTask.subscribe(tsk => this.currentTask = tsk);
    console.log("current task: "+ this.currentTask);
  }

  ngOnDestroy(): void {
    this._taskSub.unsubscribe();
  }

  loadTask(id: string) {
    this.taskService.getTask(id);
    // console.log('this.currentTask ' + this.currentTask);
  }

  newDoTask() {
    // this.taskService.newTask();
    console.log("Add new task task-list.component");
  }
}
