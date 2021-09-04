import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);


const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
const controls = new OrbitControls(camera, renderer.domElement);
var light = new THREE.SpotLight();
const stats = Stats()
camera.position.set(-150,40,150);
scene.add( light );

function init() {

    controls.addEventListener('change',renderer);

    const loader = new GLTFLoader();

    let threedobject = loader.load( 
        'models/scene2.gltf', 
        function ( gltf ) {    
        scene.add( gltf.scene );
        },

        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },

        (error) => {
            console.log(error);
        }
    );
    camera.lookAt(new THREE.Vector3(0,0,0));

    light.position.set(25,15,15);
    
 
    //scene.background = new THREE.Color(0xffffff);

    document.body.appendChild(renderer.domElement);

    animate();
}
init();


document.body.appendChild(stats.dom)

function animate(){
    renderer.setSize( window.innerWidth, window.innerHeight )

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    stats.update();
}

/*
    const axesHelper = new THREE.AxesHelper( 35 );
    scene.add( axesHelper );
    camera.position.z = 25;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change',renderer);

    const geometry = new THREE.ConeGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0xC1E300});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add( sphere );

    camera.position.z = 15;
    light.position.z = 15;
    animate();
}
function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();*/
