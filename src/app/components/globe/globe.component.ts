import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three'

const PI_HALF = Math.PI / 2;
const clamp = (x:number, min:number, max:number) => Math.min(Math.max(x, min), max);

@Component({
	selector: 'app-globe',
	templateUrl: './globe.component.html',
	styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements AfterViewInit {

	@ViewChild('canvas', {static: false})
	private canvas?: ElementRef<HTMLCanvasElement>;
	private width = 0;
	private height = 0;

	private clock = new THREE.Clock();
	private scene    = new THREE.Scene();
	private camera   = new THREE.PerspectiveCamera(75, 1, 0.001, 100);
	private renderer?:THREE.WebGLRenderer;
	private sphere?:THREE.Mesh;

	private targetRotation = new THREE.Vector3();
	private duration = 5;
	public speed = 0.04;

	private createScene() {
		this.camera.position.z = 2;
		const geometry = new THREE.SphereGeometry(1, 48, 48);
		const material = new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load('/assets/earthmap.jpg'),
			// bumpMap: new THREE.TextureLoader().load('/assets/earthbump1k.jpg'),
			// bumpScale: 0.05
		});
		this.sphere = new THREE.Mesh(geometry, material);
		this.scene.add(this.sphere);

		const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
		pointLight.position.set( 10, 10, 10 );
		this.scene.add( pointLight );

	}

	private animate() {
		if (!this.sphere) return;
		let rot = this.sphere.rotation.toVector3();
		rot.lerp(this.targetRotation, this.clock.getDelta() * this.duration);
		this.sphere.rotation.setFromVector3(rot);
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
		this.animate();
		this.renderer.render(this.scene, this.camera);
	}

	ngAfterViewInit(): void {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas?.nativeElement,
			alpha: true
		});
		this.createScene();
		this.render();
	}

	private rotate(dx:number, dy:number) {
		if (!this.sphere) return;
		this.targetRotation.x = clamp(this.sphere.rotation.x + dy * this.speed * 0.8, -PI_HALF, PI_HALF);
		this.targetRotation.y = this.sphere.rotation.y + dx * this.speed;
	}

	private mouseX = 0;
	private mouseY = 0;
	onMouseMove(e:MouseEvent) {
		if (e.buttons == 1) {
			this.rotate(e.clientX - this.mouseX, e.clientY - this.mouseY);
		}
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
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
			this.rotate(t.clientX - this.touchX, t.clientY - this.touchY);
			this.touchX = t.clientX;
			this.touchY = t.clientY;
		}
	}

}
