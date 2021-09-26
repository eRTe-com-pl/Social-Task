
export const EARTH_VERTEX_SHADER_SOURCE = `
varying vec3 vNormal;
varying vec2 vUv;
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	vNormal = normalize(normalMatrix * normal);
	vUv = uv;
}
`;

export const EARTH_FRAGMENT_SHADER_SOURCE = `
	uniform sampler2D world;
	uniform vec3 tint;
	uniform vec3 atmosphereColor;
	uniform float atmosphereRadius;
	uniform float atmosphereDecay;
	varying vec3 vNormal;
	varying vec2 vUv;
	void main() {
		vec3 diffuse = texture2D(world, vUv).xyz * tint;
		float intensity = pow(atmosphereRadius - dot(vNormal, vec3(0.0, 0.0, 1.0)), atmosphereDecay);
		vec3 atmosphere = atmosphereColor * intensity;
		gl_FragColor = vec4(diffuse + atmosphere, 1.0);
	}
`;

export const ATMOSPHERE_VERTEX_SHADER_SOURCE = `
	varying vec3 vNormal;
	void main() {
		vNormal = normalize( normalMatrix * normal );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`;

export const ATMOSPHERE_FRAGMENT_SHADER_SOURCE = `
	varying vec3 vNormal;
	uniform vec3 atmosphereColor;
	uniform float atmosphereRadius;
	uniform float atmosphereDecay;
	void main() {
		float intensity = pow( atmosphereRadius - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), atmosphereDecay );
		gl_FragColor = vec4(atmosphereColor, 1.0) * intensity;
	}
`;
