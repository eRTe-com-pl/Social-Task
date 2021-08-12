import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three'
import Atmosphere from './Atmosphere';
import Earth from './Earth';

const PI_HALF = Math.PI / 2;
const clamp = (x:number, min:number, max:number) => Math.min(Math.max(x, min), max);

export interface GlobeParameters {

	panSpeed:number;
	panDuration:number,

	zoomSpeed:number,
	zoomDuration:number,
	zoomMin:number,
	zoomMax:number,

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

@Component({
	selector: 'globe',
	templateUrl: './globe.component.html',
	styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements AfterViewInit {

	@Input() public params:GlobeParameters = {
		panSpeed: 0.04,
		panDuration: 5,
		zoomSpeed: 0.0007,
		zoomDuration: 0.4,
		zoomMin: 1.1,
		zoomMax: 1.8,
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

	@ViewChild('canvas', {static: false})
	private canvas?: ElementRef<HTMLCanvasElement>;
	private width = 0;
	private height = 0;

	private clock  = new THREE.Clock();
	private scene  = new THREE.Scene();
	private camera = new THREE.PerspectiveCamera(75, 1, 0.001, 10000);
	private renderer?:THREE.WebGLRenderer;
	
	private targetRotation = new THREE.Vector3();
	private targetZoom = new THREE.Vector3(0, 0, 1.8);


	public earth:Earth;
	public atmosphere:Atmosphere;


	constructor() {
		this.earth = new Earth(this.scene);
		this.atmosphere = new Atmosphere(this.scene);
		this.targetZoom.z = this.params.zoomMax;
		this.camera.position.z = this.targetZoom.z;
	}

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
		
		let rot = this.scene.rotation.toVector3();
		rot.lerp(this.targetRotation, this.clock.getDelta() * this.params.panDuration);
		this.scene.rotation.setFromVector3(rot);

		this.camera.position.lerp(this.targetZoom, this.params.zoomDuration);

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

	private handlePan(dx:number, dy:number) {
		let s = this.params.panSpeed * this.targetZoom.z / this.params.zoomMax;
		this.targetRotation.x = clamp(this.scene.rotation.x + dy * s * 0.8, -PI_HALF, PI_HALF);
		this.targetRotation.y = this.scene.rotation.y + dx * s;
	}

	private handleZoom(dx:number) {
		this.targetZoom.z = clamp(this.targetZoom.z + dx * this.params.zoomSpeed, this.params.zoomMin, this.params.zoomMax);
	}

	private mouseX = 0;
	private mouseY = 0;
	onMouseMove(e:MouseEvent) {
		if (e.buttons == 1) {
			this.handlePan(e.clientX - this.mouseX, e.clientY - this.mouseY);
		}
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
	}

	onMouseWheel(e:any) {
		this.handleZoom(e.deltaY);
	}

	private touchX = 0;
	private touchY = 0;
	onTouchBegin(e:TouchEvent) {
		e.preventDefault();
		if (e.targetTouches.length == 1) {
			this.touchX = e.targetTouches[0].clientX;
			this.touchY = e.targetTouches[0].clientY;
		}
	}

	onTouchMove(e:TouchEvent) {
		e.preventDefault();
		if (e.targetTouches.length == 1) {
			let t = e.targetTouches[0]
			this.handlePan(t.clientX - this.touchX, t.clientY - this.touchY);
			this.touchX = t.clientX;
			this.touchY = t.clientY;
		}
	}

}
