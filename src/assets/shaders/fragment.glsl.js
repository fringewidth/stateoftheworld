

const fragmentShader = `uniform sampler2D globeTexture;
varying vec2 vUV;
varying vec3 vNormal;

void main() {
    float intensity = 1.05 - dot(vNormal, vec3(0, 0, 1));
    vec3 atmosphere = vec3(0.3, 0.6, 1) * pow(intensity, 1.5);
    gl_FragColor = vec4(texture2D(globeTexture, vUV).xyz + atmosphere, 1.0);
}`;

export default fragmentShader;
