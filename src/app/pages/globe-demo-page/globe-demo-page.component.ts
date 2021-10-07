import { GlobeParameters } from 'src/app/components/globe/globe.component';
import { Component } from '@angular/core';

@Component({
	selector: 'app-globe-demo-page',
	templateUrl: './globe-demo-page.component.html',
	styleUrls: ['./globe-demo-page.component.scss']
})
export class GlobeDemoPageComponent {

	public params:GlobeParameters;
	public dump:string = "";

	constructor() {
		this.params = {
			control: {
				panSpeed: 0.04,
				panDuration: 5,
				zoomSpeed: 0.0007,
				zoomDuration: 0.4,
				zoomMin: 1.1,
				zoomMax: 1.8,
			},
			earthSize: 1.0,
			earthTint: '#ffffff',
			earthAtmosphereRadius: 1.5,
			earthAtmosphereDecay: 5.4,
			earthAtmosphereColor: '#587cfd',
			atmosphereSize: 1.4,
			atmosphereRadius: 0.8,
			atmosphereDecay: 12.0,
			atmosphereColor: '#5c6fff',
		}
		this.doDump();
	}

	doDump() {
		this.dump = JSON.stringify(this.params, null, 4);
	}

}
