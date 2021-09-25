import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrbitalControl, OrbitalControlParams } from './OrbitalControl';
import Atmosphere from './Atmosphere';
import * as THREE from 'three'
import Earth from './Earth';

export interface GlobeParameters {

	control:OrbitalControlParams,

	earthSize:number,
	earthTint:string,
	earthAtmosphereRadius:number,
	earthAtmosphereDecay:number,
	earthAtmosphereColor:string,

	atmosphereSize:number,
	atmosphereRadius:number,
	atmosphereDecay:number,
	atmosphereColor:string,
}

export const DEFAULT_GLOBE_PARAMS:GlobeParameters = {
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
	earthAtmosphereRadius: 1.31,
	earthAtmosphereDecay: 3.0,
	earthAtmosphereColor: '#0000FF',
	atmosphereSize: 1.1,
	atmosphereRadius: 0.8,
	atmosphereDecay: 12.0,
	atmosphereColor: '#0000FF',
};

@Component({
	selector: 'globe',
	templateUrl: './globe.component.html',
	styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements AfterViewInit {

	@Input() public params:GlobeParameters = DEFAULT_GLOBE_PARAMS;

	@ViewChild('canvas', {static: false})
	private canvas?: ElementRef<HTMLCanvasElement>;
	private width = 0;
	private height = 0;

	private clock  = new THREE.Clock();
	private scene  = new THREE.Scene();
	private camera = new THREE.PerspectiveCamera(75, 1, 0.001, 10000);
	private renderer?:THREE.WebGLRenderer;

	public control:OrbitalControl;
	public atmosphere:Atmosphere;
	public earth:Earth;

	constructor() {
		this.earth = new Earth(this.scene);
		this.atmosphere = new Atmosphere(this.scene);
		this.control = new OrbitalControl(this.camera, this.scene, this.params.control, this.clock);
	}

	// Example of implementation
	// ngOnInit() {
	// 	let points = this.globeService.getAllPoints()
	// 	this.render(points);
	// 	this.globeService.subscrite(point => {
	// 		points[point.id] = point;
	// 		rerender(point);
	// 	})
	// }

	private render() {
		requestAnimationFrame(this.render.bind(this));

		if (!this.renderer || !this.canvas) return;

		if (this.width != this.canvas.nativeElement.width ||
			this.height != this.canvas.nativeElement.height)  {
			this.width = this.canvas.nativeElement.width;
			this.height = this.canvas.nativeElement.height;
			this.camera.aspect = this.width / this.height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.width, this.height);
		}

		this.control.animate();

		this.earth.mesh.scale.setScalar(this.params.earthSize);
		this.earth.uniforms.tint.value = new THREE.Color(this.params.earthTint);
		this.earth.uniforms.atmosphereRadius.value = this.params.earthAtmosphereRadius;
		this.earth.uniforms.atmosphereDecay.value = this.params.earthAtmosphereDecay;
		this.earth.uniforms.atmosphereColor.value = new THREE.Color(this.params.earthAtmosphereColor);

		this.atmosphere.mesh.scale.setScalar(this.params.atmosphereSize);
		this.atmosphere.uniforms.atmosphereRadius.value = this.params.atmosphereRadius;
		this.atmosphere.uniforms.atmosphereDecay.value = this.params.atmosphereDecay;
		this.atmosphere.uniforms.atmosphereColor.value = new THREE.Color(this.params.atmosphereColor);

		this.renderer.render(this.scene, this.camera);
	}

	ngAfterViewInit(): void {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas?.nativeElement,
			alpha: true,
			antialias: true,
		});
		this.render();
	}

}
