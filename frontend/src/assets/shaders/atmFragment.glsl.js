export default function atmFragmentShader(r, g, b ,a){
    return  `
varying vec3 vNormal;
void main(){
    float intensity = pow(0.4-dot(vNormal, vec3(0, 0, 1)), 2.0);
gl_FragColor = vec4(${r},${g},${b},${a}) * intensity;
}
`
}