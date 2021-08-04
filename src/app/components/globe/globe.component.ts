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
	private sphere?:THREE.Mesh;

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
		// this.cube.rotation.x += 0.01;
		this.sphere.rotation.y += 0.01;
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

	onMouseMove(e:MouseEvent) {
		console.log(e.clientX, e.clientY, e.buttons);
	}

}
