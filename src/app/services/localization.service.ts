// import { Position } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
//import { Interface } from 'readline';

@Injectable({
	providedIn: 'root'
})

export class LocalizationService {
	coordinates = { latitude: 1, longitude: 0 };
	constructor() { }

	getPosition(): Promise<any>
	{
	  return new Promise((resolve, reject) => {
  
		navigator.geolocation.getCurrentPosition(resp => {
  
			resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
		  },
		  err => {
			reject(err);
		  });
	  });
	}

	getPositionObser(): Observable<any> {
		return new Observable(observer => {
		  window.navigator.geolocation.getCurrentPosition(position => {
			observer.next(position);
			observer.complete();
		  },
			error => observer.error(error));
		});
	}

	// getGeocoder(latLng : google.maps):
	// getLocation(): Observable<Position> {
	// 	return Observable.create((observer: Observer<Position>) => {
	// 		// Invokes getCurrentPosition method of Geolocation API.
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position: Position) => {
	// 				observer.next(position);
	// 				observer.complete();
	// 			},
	// 			(error: PositionError) => {
	// 				console.log('Geolocation service: ' + error.message);
	// 				observer.error(error);
	// 			}
	// 		);
	// 	});

	// 	// if (navigator.geolocation) {
	// 	// 	navigator.geolocation.getCurrentPosition((position ) => {
	// 	// 		this.coordinates.latitude = position.coords.latitude;
	// 	// 		this.coordinates.longitude = position.coords.longitude;
	// 	// 		console.log(this.coordinates);
	// 	// 		return position;
	// 	// 		// const longitude = position.coords.longitude;
	// 	// 		// const latitude = position.coords.latitude;
	// 	// 		// this.callApi(this.coordinates.longitude, this.coordinates.latitude);
	// 	// 	});
	// 	// } else {
	// 	// 	console.log("No support for geolocation");
	// 	// }
	// }

	// 	getLongtitude() {
	// 		return this.coordinates.longitude;
	// 	}
	// 	callApi(Longitude: number, Latitude: number) {
	// 		const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
	// 		console.log(url);
	// 	}
}
