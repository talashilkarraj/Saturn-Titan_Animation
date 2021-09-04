import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    10,
    3000);

camera.position.set( 40, 0, 450 );

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: true } );

const ambientLight = new THREE.AmbientLight( 0x404040, 3 );
const pointLight = new THREE.PointLight( 0xfffff2, 5 , 350 );
ambientLight.position.set( 0, 50, 350 );
pointLight.position.set( 0,50, 350);

//scene.add( ambientLight );
scene.add( pointLight );

pointLight.castShadow = true;
 
let space1 = [];
function init(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', renderer );
    controls.dampingFactor = 21.3;
    // let axeshelper = new THREE.AxesHelper(35);
    // scene.add(axeshelper);
    camera.lookAt(new THREE.Vector3(0,0,0));

    for(let i=0;i<=1000;i++)
    {
        let geometry  =new THREE.BoxGeometry(Math.random()*14, Math.random()*24,Math.random()*43);
        let material = new THREE.MeshPhongMaterial({
            color:0x363e42,
            specular:0x303030,
            reflectivity: true
        });
        let space = new THREE.Mesh(geometry, material);

        space1.push(space);
        scene.add(space);
        space.position.set(Math.random()*416,Math.random()*434,Math.random()*425)
    }

    document.body.appendChild( renderer.domElement );
    animate();
}

function animate(){
    window.addEventListener('resize', () => {window.location.reload()} );
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    let x = 0.2
    space1.rotateX(x);
    x+=0.21;

}

init();
