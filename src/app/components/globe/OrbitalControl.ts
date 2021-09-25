import * as THREE from 'three'

const PI_HALF = Math.PI / 2;
const clamp = (x:number, min:number, max:number) => Math.min(Math.max(x, min), max);

export interface OrbitalControlParams {

	panSpeed:number;
	panDuration:number,

	zoomSpeed:number,
	zoomDuration:number,
	zoomMin:number,
	zoomMax:number,

}

export class OrbitalControl {

	private mouseX = 0;
	private mouseY = 0;
	private touchX = 0;
	private touchY = 0;

	private targetRotation = new THREE.Vector3();
	private targetZoom = new THREE.Vector3(0, 0, 1.8);

	constructor(public camera:THREE.Camera, public scene:THREE.Scene, public params:OrbitalControlParams, public clock:THREE.Clock) {
		this.targetZoom.z = this.params.zoomMax;
		this.camera.position.z = this.targetZoom.z;
	}

	public animate() : void {
		let rot = this.scene.rotation.toVector3();
		rot.lerp(this.targetRotation, this.clock.getDelta() * this.params.panDuration);
		this.scene.rotation.setFromVector3(rot);
		this.camera.position.lerp(this.targetZoom, this.params.zoomDuration);
	}

	private handlePan(dx:number, dy:number) {
		let s = this.params.panSpeed * this.targetZoom.z / this.params.zoomMax;
		this.targetRotation.x = clamp(this.scene.rotation.x + dy * s * 0.8, -PI_HALF, PI_HALF);
		this.targetRotation.y = this.scene.rotation.y + dx * s;
	}

	private handleZoom(dx:number) {
		this.targetZoom.z = clamp(this.targetZoom.z + dx * this.params.zoomSpeed, this.params.zoomMin, this.params.zoomMax);
	}

	public onMouseMove(e:MouseEvent) : void {
		if (e.buttons == 1) {
			this.handlePan(e.clientX - this.mouseX, e.clientY - this.mouseY);
		}
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
	}

	public onMouseWheel(e:any) : void {
		this.handleZoom(e.deltaY);
	}

	public onTouchBegin(e:TouchEvent) : void {
		e.preventDefault();
		if (e.targetTouches.length == 1) {
			this.touchX = e.targetTouches[0].clientX;
			this.touchY = e.targetTouches[0].clientY;
		}
	}

	public onTouchMove(e:TouchEvent) : void {
		e.preventDefault();
		if (e.targetTouches.length == 1) {
			let t = e.targetTouches[0]
			this.handlePan(t.clientX - this.touchX, t.clientY - this.touchY);
			this.touchX = t.clientX;
			this.touchY = t.clientY;
		}
	}

}
