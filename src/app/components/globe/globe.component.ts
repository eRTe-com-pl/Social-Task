import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three'

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

	private scene    = new THREE.Scene();
	private camera   = new THREE.PerspectiveCamera(75, 1, 0.001, 100);
	private renderer?:THREE.WebGLRenderer;
	private cube?:THREE.Mesh;

	constructor() { }

	private createScene() {
		this.camera.position.z = 5;
		const geometry = new THREE.BoxGeometry();
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true,
		});
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);
	}

	private animate() {
		if (!this.cube) return;
		this.cube.rotation.x += 0.05;
		this.cube.rotation.y += 0.05;
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

	resizeClick() {
		console.log('Resize clicked');
		if(!this.canvas) return;
		this.canvas.nativeElement.width += 50;
		this.canvas.nativeElement.height += 50;
	}

}
