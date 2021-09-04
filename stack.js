import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    10,
    3000
);

camera.position.set( 15, 10, 15 );

const scene = new THREE.Scene();

//antilias is true for removing visual distortions
const renderer = new THREE.WebGLRenderer( { antialias:true } );

//Ambient light is added for proper view of the objects
//Point light is added simulating sun
const ambientLight = new THREE.AmbientLight( 0x404040, 1 );
const pointLight = new THREE.PointLight( 0xfffff2, 1 , 350 );
ambientLight.position.set( 10, 30, 10 );
pointLight.position.set( 40, 0, 20 );
scene.add( ambientLight );
pointLight.castShadow = true;
scene.add( pointLight );

/////////EK min call pe hu aya me

let Newcube, cube, o = 1;
let b1;
function init(){

    // const axesHelper = new THREE.AxesHelper(35);
    // scene.add(axesHelper);

    renderer.setSize(window.innerWidth,window.innerHeight);
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', renderer );

    const geometry = new THREE.BoxGeometry( 7, 1, 7 );
    const material = new THREE.MeshPhongMaterial( {
        color:0x363e42,
        specular:0x303030,
        reflectivity: true}
    );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    window.addEventListener('click', () => {
        //     let geometry = new THREE.BoxGeometry( 7, 1, 7 );
        //     let material = new THREE.MeshPhongMaterial( {
        //     color:'#' + Math.random().toString(16).substr(-6) ,
        //     specular:0x303030,
        //     reflectivity: true}
        // );
        //     Newcube = new THREE.Mesh( geometry, material );
        //     scene.add( Newcube );
        //     Newcube.position.set(-7,o,0)
        //     o+= 1;
        //     window.addEventListener('click', () => {
        //         Newcube.position.x+=0.01;
        //     })
        
        b1 = new block().mesh;
        b1.position.set(0,o,0);
        camera.position.set(15,o+10,15)
        camera.lookAt(0,o,0);
        o+=1;
        } )

    document.body.appendChild( renderer.domElement );
   
}

class block{
    constructor(){
        this.geometry1 = new THREE.BoxGeometry( 7, 1, 7 );
        this.material1 = new THREE.MeshPhongMaterial( {
            color:'#' + Math.random().toString(16).substr(-6) ,
            specular:0x303030,
            reflectivity: true}
        );
        this.mesh = new THREE.Mesh( this.geometry1, this.material1 );
        scene.add(this.mesh);
    }
}

function animate(){
    window.addEventListener('resize', () => {window.location.reload()});
    b1.position.x+=0.02;
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

init();
animate();