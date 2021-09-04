import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    10,
    3000
);

camera.position.set( 0, -3, 50 );

const scene = new THREE.Scene();

//antilias is true for removing visual distortions
const renderer = new THREE.WebGLRenderer( { antialias:true } );

//Ambient light is added for proper view of the objects
//Point light is added simulating sun
const ambientLight = new THREE.AmbientLight( 0x404040, 1 );
const pointLight = new THREE.PointLight( 0xfffff2, 1 , 350 );
ambientLight.position.set( 0, 30, 0 );
pointLight.position.set( 100, 0, 70 );
scene.add( ambientLight );
pointLight.castShadow = true;
scene.add( pointLight );

let ring,saturn,moon;
function init(){

    //uncomment following block of code to undestand axes positions &
    //to understand the point of source of light

    /*
    const axesHelper = new THREE.AxesHelper(35);
    scene.add(axesHelper);
    
    const pointLightHelper = new THREE.PointLightHelper( light2, 4 );
    scene.add( pointLightHelper );
    */

    //controls are used for handling the objects using mouse
    renderer.setSize(window.innerWidth,window.innerHeight);
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', renderer );

    controls.minDistance  = 60; //60 units radius for min pan of camera
    controls.maxDistance  = 75; //75 units radius for max pan of camera

    // pi/2 is he max & min polar angle so the object is not vertically rotatable
    controls.maxPolarAngle = Math.PI/2; 
    controls.minPolarAngle = Math.PI/2;

    //Saturn's Globe
    let geometry = new THREE.SphereGeometry( 10, 52, 52 );
    const texture = new THREE.TextureLoader().load( 'textures/8k_saturn.jpg' );
    const material = new THREE.MeshLambertMaterial( { map: texture } );
    saturn = new THREE.Mesh( geometry, material );
    saturn.rotateOnWorldAxis( new THREE.Vector3( 0, 0, 1 ), 0.466526509 );
    //Saturn's axis tilt is 26.73Deg = 0.466526509rad(approx.)
    scene.add( saturn );

    //Saaturn's Rings
    let geometry1 = new THREE.RingGeometry( 20, 25, 52 );
    const texture2 = new THREE.TextureLoader().load( 'textures/rings.jpg' );
    const material1 = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide, map: texture2} );
    ring = new THREE.Mesh( geometry1, material1 );
    ring.rotateOnWorldAxis( new THREE.Vector3( 1, 0, 0 ), Math.PI/2 );
    ring.rotateOnWorldAxis( new THREE.Vector3( 0, 0, 1 ), 0.383972 );
    ring.rotateZ( Math.PI/4 );
    scene.add( ring );

    //Saturn's Moon Titan
    let moon_geo = new THREE.SphereGeometry(0.9, 52, 52);
    const moon_texture = new THREE.TextureLoader().load( 'textures/titan.jpg' );
    const moon_material = new THREE.MeshLambertMaterial( { map: moon_texture } );
    moon = new THREE.Mesh( moon_geo, moon_material );
    moon.translateOnAxis( new THREE.Vector3(0, 1, 0 ), 14 );
    moon.translateOnAxis( new THREE.Vector3(0, 0, 1), 14 );
    //Saturn's axis tilt is 26.73Deg = 0.466526509rad(approx.)
    scene.add( moon );
    document.body.appendChild( renderer.domElement );
    animate();
}

let r = 30;
let theta = 0;
let dTheta = 2 * Math.PI / 800;

function animate(){
    window.addEventListener('resize', () => {window.location.reload()} );
    let b = 0;
    b += 0.0050;
    ring.rotateOnWorldAxis( new THREE.Vector3( 0, 1, 0 ), b );
    saturn.rotateOnWorldAxis( new THREE.Vector3( 0, 1, 0 ), b );
    ring.rotation.z += -0.005;

    theta -= dTheta;
    moon.position.x = r * Math.cos( theta );
    moon.position.z = r * Math.sin( theta );
    moon.rotation.y += 0.025;
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

init();