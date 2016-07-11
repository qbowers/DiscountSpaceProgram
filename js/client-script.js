/*----Load Protocol----
loader.load('file name/path', function (geometry) {
    //do anything with geometry you like
    //can go so far as to add the object to the scene
    //can also just return the geometry and deal with it externally
    
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var base = new THREE.Mesh( geometry, material );
	base.position.set(2.7, 0, -2);
    base.rotation.set(Math.PI / -2, 0, 0);
	base.scale.set( 0.1, 0.1, 0.1);
    scene.add(base);
});
----Load protocol----*/


/*----SETUP----*/
var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    
    loader = new THREE.STLLoader(),
    
    light = new THREE.PointLight( 0xffffff, 2, 100 ),
    
    renderer = new THREE.WebGLRenderer(/*{alpha: true}*/);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

light.position.set(0, 0, 0);
scene.add(light);
/*----SETUP----*/


/*----LOCAL VARIABLES----*/
var keyState = {};

var bodies = [];

var curser = {
    reset: false,
    x: 0,
    y: 0,
    dif: {
        x: 0,
        y: 0
    }
};
var view = {
    focus: '',
    length: 20,
    z_rot: 0,
    y_rot: 0,
    XZLength: 0,
    r_pos: {
        x: 7,
        y: 7,
        z: 7
    },
    
    speed: 0.1,
    curser_speed: 0.007
};

/*----LOCAL VARIABLES----*/


/*----EVENTS----*/
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
window.addEventListener('resize', windowResize, false);
document.addEventListener('mousemove', mouseMove, false);


function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function keyDown(event) {
    if (event.keyCode == 17 || event.which == 17) {
        curser.reset = true;
    }
    
    keyState[event.keyCode || event.which] = true;
}
function keyUp(event) {
    keyState[event.keyCode || event.which] = false;
}



function mouseMove() {
    if(keyState[17]) {
        if(curser.reset == true) {
            curser.x = event.clientX;
            curser.y = event.clientY;
            
            curser.reset = false;
        } else {
            
            curser.dif.x = event.clientX - curser.x;
            curser.dif.y = curser.y - event.clientY;
            
            
            view.z_rot -= curser.dif.y * view.curser_speed;
            view.y_rot -= curser.dif.x * view.curser_speed;
            
            curser.x = event.clientX;
            curser.y = event.clientY;
            
            camUpdate();
        }
    }
}
/*----EVENTS----*/




/*----HELPERS----*/
function r_set(t_obj, l_obj) {
    t_obj.rotation.x = l_obj.x;
    t_obj.rotation.y = l_obj.y;
    t_obj.rotation.z = l_obj.z;
}

function p_set(t_obj, l_obj) {
    t_obj.position.x = l_obj.x;
    t_obj.position.y = l_obj.y;
    t_obj.position.z = l_obj.z;
}
/*----HELPERS----*/








function CREATE() {
    
    var line = {
        x: {
            geometry: new THREE.Geometry(),
            material: new THREE.LineBasicMaterial({color: 0xff0000})
        },
        y: {
            geometry: new THREE.Geometry(),
            material: new THREE.LineBasicMaterial({color: 0x00ff00})
        },
        z: {
            geometry: new THREE.Geometry(),
            material: new THREE.LineBasicMaterial({color: 0x0000ff})
        }
    }
    line.x.geometry.vertices.push(new THREE.Vector3(0,0,0));
    line.y.geometry.vertices.push(new THREE.Vector3(0,0,0));
    line.z.geometry.vertices.push(new THREE.Vector3(0,0,0));
    
    line.x.geometry.vertices.push(new THREE.Vector3(10,0,0));
    line.y.geometry.vertices.push(new THREE.Vector3(0,10,0));
    line.z.geometry.vertices.push(new THREE.Vector3(0,0,10));
    
    line.x.mesh = new THREE.Line(line.x.geometry, line.x.material);
    line.y.mesh = new THREE.Line(line.y.geometry, line.y.material);
    line.z.mesh = new THREE.Line(line.z.geometry, line.z.material);
    
    
    scene.add(line.x.mesh);
    scene.add(line.y.mesh);
    scene.add(line.z.mesh);
    
}




function checkKeys() {
    
    if (keyState[87]) {} //w
    if (keyState[83]) {} //s
    if (keyState[65]) {} //a
    if (keyState[68]) {} //d
    
    
    if (keyState[32]) {} //space
    
    
    if (keyState[38]) {
        view.z_rot += view.speed;
        camUpdate();
    } //up
    if (keyState[40]) {
        view.z_rot -= view.speed;
        camUpdate();
    } //down
    if (keyState[37]) {
        view.y_rot -= view.speed;
        camUpdate();
    } //left
    if (keyState[39]) {
        view.y_rot += view.speed;
        camUpdate();
    } //right
    
    if (keyState[189]) {
        view.length += 1;
        camUpdate();
    } //-
    if (keyState[187]) {
        view.length -= 1;
        camUpdate();
    } //=
    
    
    if (keyState[33]) {} //pgup
    if (keyState[34]) {} //pgdn
    
    
    
}




function camUpdate() {
    if (view.z_rot > Math.PI / 2) {
        view.z_rot = Math.PI / 2;
    } else if (view.z_rot < Math.PI / -2) {
        view.z_rot = Math.PI / -2;
    };
    
    if (view.y_rot > Math.PI * 2) {
        view.y_rot -= Math.PI * 2;
    } else if (view.y_rot <= 0) {
        view.y_rot += Math.PI * 2;
    };
    
    
    view.r_pos.y = Math.sin(view.z_rot) * view.length;
    view.XZLength = Math.cos(view.z_rot) * view.length;
    
    view.r_pos.x = Math.sin(view.y_rot) * view.XZLength;
    view.r_pos.z = Math.cos(view.y_rot) * view.XZLength;
}

function camSet() {
    /*
    camera.position = view.focus.position;
    camera.position.x += trigonometry
    
    OR
    */
    
    camera.position.x = view.focus.position.x + view.r_pos.x;
    camera.position.y = view.focus.position.y + view.r_pos.y;
    camera.position.z = view.focus.position.z + view.r_pos.z;
    
    camera.lookAt(view.focus.position);
}

/*function statLog() {
    document.getElementById('z_rot').innerHTML = view.z_rot;
    document.getElementById('y_rot').innerHTML = view.y_rot;
}*/

function render() {
    requestAnimationFrame(render);
    
    
    checkKeys();
    camSet();
    //statLog();
    renderer.render(scene, camera);
}