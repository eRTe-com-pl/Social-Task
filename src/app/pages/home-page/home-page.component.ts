import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { io } from 'socket.io-client';
// import { ChatService } from "../../services/chat.service";
import { TaskService } from '../../services/task.service';
import { Socket } from 'ngx-socket-io';
import { Task } from '../../models/task.model';
import { LocalizationService } from "../../services/localization.service";

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
	longtitude: number | undefined;
	latitude: number | undefined;
	coordinate: any | undefined;

	constructor(private taskService: TaskService, private localizationService: LocalizationService) { }

	ngOnInit(): void {
		this.taskService.numberOfUsersOnline
			.subscribe(numberOfUsersOnline => this.numberOfUsersOnline = numberOfUsersOnline)
		// this.coordinate = this.localizationService.getLocation();
		this.coordinate = this.localizationService.getPosition().then(pos => {
			console.log(`Positon: ${pos.lng} ${pos.lat}`);
		});

		this.localizationService.getPositionObser().subscribe(
			pos => {
				this.longtitude = pos.coords.longitude;
				this.latitude = pos.coords.latitude;
			}
		)

		console.log('localization >');
		console.log(this.coordinate);
	}

	// getPosition(options?: PositionOptions): Promise<Position> {
	// 	return new Promise((resolve, reject) => 
	// 		navigator.geolocation.getCurrentPosition(resolve, reject, options)
	// 	);
	// }

	ngOnDestroy(): void {
		this._taskSub.unsubscribe();
	}

	sendMessage() {
		// this.chat.sendMsg("hallo");
		console.log('sendMessage');
	}
}
