var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.TextureLoader();
var time = 1;
//var controls = new THREE.OrbitControls( camera );

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );
window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

// Sphere 1 #_sp1
var geo_sp1 = new THREE.SphereGeometry( 1, 32, 32 );
var texture_sp1 = loader.load("img/marble.jpg");
var mat_sp1 = new THREE.MeshPhongMaterial({
    //color: 0xFF0000,
    map: texture_sp1
});
var sp1 = new THREE.Mesh( geo_sp1, mat_sp1 );
sp1.castShadow = true;

// Directional Light for Sphere
var light_d1 = new THREE.DirectionalLight( 0xFFFFFF, .8 );
light_d1.castShadow = true;
light_d1.shadow.radius = 10;

// Stage
var geo_stage = new THREE.BoxGeometry( 100, 100, 100 );
var mat_stage = new THREE.MeshBasicMaterial({ color: 0xFFBF00, side: THREE.BackSide })
var stage = new THREE.Mesh( geo_stage, mat_stage );
stage.position.y = 40;

// Shadow realm
var geo_shadowPlane = new THREE.PlaneGeometry( 100, 100 );
geo_shadowPlane.rotateX( -Math.PI / 2 );
var mat_shadow = new THREE.ShadowMaterial({ side: THREE.DoubleSide });
mat_shadow.opacity = 0.25;
var shadowPlane = new THREE.Mesh( geo_shadowPlane, mat_shadow );
shadowPlane.receiveShadow = true;
shadowPlane.position.y = -2;

// Ambient Light
var light_am1 = new THREE.AmbientLight( 0xFFFFFF, 0.7 );

// Add all the things
scene.add( sp1, light_d1, light_am1, stage, shadowPlane );

camera.position.z = 5;

var render = function() {
    requestAnimationFrame( render );
    sp1.rotation.y += 0.005;
    sp1.position.y = ( Math.sin(time) / 6);
    time += 0.025;
    //controls.update();
    renderer.render( scene, camera );
};

render();