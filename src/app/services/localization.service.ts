import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  coordinates = {latitude: 1, longitude: 0};
  constructor() { this.getLocation}

  getLocation(): void {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;

				// const longitude = position.coords.longitude;
				// const latitude = position.coords.latitude;
				this.callApi(this.coordinates.longitude, this.coordinates.latitude);
			});
		} else {
			console.log("No support for geolocation");
		}
	}

  getLongtitude(){
    return this.coordinates.longitude;
  }
	callApi(Longitude: number, Latitude: number) {
		const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
		console.log(url);
	}
}
