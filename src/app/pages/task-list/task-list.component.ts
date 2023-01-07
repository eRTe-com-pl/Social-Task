import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from "rxjs";

import { TaskService } from "../../services/task.service";
import { LocalizationService } from "../../services/localization.service";
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
  latitude!: number;
  longitude!: number;

  constructor(private taskService: TaskService, private localizationService: LocalizationService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.tasks;
    this._taskSub = this.taskService.currentTask.subscribe(tsk => this.currentTask = tsk);

    this.localizationService.getPositionObser().subscribe(
			pos => {
				this.latitude = pos.coords.latitude;
				this.longitude = pos.coords.longitude;
			}
		);
  }

  ngOnDestroy(): void {
    this._taskSub.unsubscribe();
  }

  sendTask(id: string) {
    this.taskService.sendTask(id, this.latitude, this.longitude);
    console.log('this.latitude ' + this.latitude);
  }

  newDoTask() {
    // this.taskService.newTask();
    console.log("Add new task task-list.component");
  }
}
