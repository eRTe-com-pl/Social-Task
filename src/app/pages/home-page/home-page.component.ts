import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import {io} from 'socket.io-client';
// import { ChatService } from "../../services/chat.service";
import { TaskService } from '../../services/task.service';
import { Socket } from 'ngx-socket-io';
import { Task } from '../../models/task.model';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
	// socket: any;
	numberOfUsersOnline: number | undefined;
	// tasks: Observable<string[]> | undefined;
	currentTask: string | undefined;
	private _taskSub!: Subscription;
	private _numberUserOnline: Subscription | undefined;

	constructor(private taskService: TaskService, private socket: Socket) {}

	ngOnInit(): void {
		// this.numberOfOnlineUsers = 4;

		// this.taskService.numberOfUsersOnline.subscribe(numberOfOnlineUsers => this.numberOfOnlineUsers = numberOfOnlineUsers)
		this.socket.on(
			'numberOfUsersOnline',
			(numberOfUsersOnline: number | undefined) => {
				this.numberOfUsersOnline = numberOfUsersOnline;
				console.log('numberOfOnlineUsers : ' + numberOfUsersOnline);
			}
		);
	}

	ngOnDestroy(): void {
		this._taskSub.unsubscribe();
	}

	sendMessage() {
		// this.chat.sendMsg("hallo");
		console.log('sendMessage');
	}
}
