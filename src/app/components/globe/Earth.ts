import * as THREE from "three";
import { EARTH_FRAGMENT_SHADER_SOURCE, EARTH_VERTEX_SHADER_SOURCE } from "./shaders";

export default class Earth {

	public material:THREE.Material;

	public uniforms = {
		world: new THREE.Uniform(new THREE.Texture()),
		tint: new THREE.Uniform(new THREE.Vector3(1.0, 1.0, 1.0)),
		atmosphereColor: new THREE.Uniform(new THREE.Vector3(0.0, 0.0, 1.0)),
		atmosphereRadius: new THREE.Uniform(1.31),
		atmosphereDecay: new THREE.Uniform(3.0),
	};

	public mesh:THREE.Mesh;

	constructor(private scene:THREE.Scene) {

		this.uniforms.world.value = new THREE.TextureLoader().load('/assets/earthmap.jpg');

		let geometry = new THREE.SphereGeometry(1, 48, 48);

		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: EARTH_VERTEX_SHADER_SOURCE,
			fragmentShader: EARTH_FRAGMENT_SHADER_SOURCE
		});

		this.mesh = new THREE.Mesh(geometry, this.material);
		this.scene.add(this.mesh);

	}


}

