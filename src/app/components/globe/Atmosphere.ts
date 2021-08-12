import { ATMOSPHERE_VERTEX_SHADER_SOURCE, ATMOSPHERE_FRAGMENT_SHADER_SOURCE } from "./shaders";
import * as THREE from "three";

export default class Atmosphere {

	public material:THREE.Material;
	public uniforms = {
		atmosphereColor: new THREE.Uniform(new THREE.Vector3(0.0, 0.0, 1.0)),
		atmosphereRadius: new THREE.Uniform(0.8),
		atmosphereDecay: new THREE.Uniform(12.0),
	};
	public mesh:THREE.Mesh;

	constructor(private scene:THREE.Scene) {

		let geometry = new THREE.SphereGeometry(1, 48, 48);

		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: ATMOSPHERE_VERTEX_SHADER_SOURCE,
			fragmentShader: ATMOSPHERE_FRAGMENT_SHADER_SOURCE,
			transparent: true,
			side: THREE.BackSide
		});

		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.scale.set(1.1, 1.1, 1.1);
		this.scene.add(this.mesh);

	}


}

