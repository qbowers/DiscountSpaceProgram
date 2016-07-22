/*----SETUP----*/
var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.000001, 1000),
    loader = new THREE.STLLoader(),
    light = new THREE.PointLight( 0xffffff, 2, 100 ),
    renderer = new THREE.WebGLRenderer(/*{alpha: true}*/);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
light.position.set(0, 0, 0);
scene.add(light);
/*----SETUP----*/


/*----LOCAL VARIABLES----*/
var keyState = {},
    c_bodies = {},
    g_rules;

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
    length: 5,
    z_rot: 0,
    y_rot: 0,
    XZLength: 0,
    r_pos: {x: 7, y: 7, z: 7},
    speed: 0.1,
    curser_speed: 0.007,
    zoom_speed: 40
};

/*----LOCAL VARIABLES----*/


/*----EVENTS----*/
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
window.addEventListener('resize', windowResize, false);
document.addEventListener('mousemove', mouseMove, false);
document.addEventListener('wheel', wheel, false);

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
            
            view.update();
        }
    }
}

function wheel() {
    view.zoom(event.wheelDelta / -120);
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
function Body(data) {
    this.radius = data.radius;
    this.geometry = new THREE.SphereGeometry(data.radius);
    
    this.material = data.material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);
}

function orbit_build(segments, body) {
    var focus = c_bodies[body].orbit.focus,
        p_rad = c_bodies[focus].radius,
        apoapse = c_bodies[body].orbit.apoapse + p_rad,
        periapse = c_bodies[body].orbit.periapse + p_rad;
    
    var a = (apoapse + periapse) / 2,
        c = a - periapse,
        b = Math.sqrt(Math.pow(a, 2) - Math.pow(c, 2)),
        
        geometry = new THREE.Geometry(),
        material = new THREE.LineBasicMaterial({color: 0xffffff}),
        pointList = [];
    
    for (var i = 0; i < segments; i++) {
        var angle = 2 * i * Math.PI / segments,
            x = (a * b / Math.sqrt(Math.pow(b, 2) + (Math.pow(a, 2) * Math.pow(Math.tan(angle), 2))));
        
        if (i <= segments / 4 || i > 3 * segments / 4) {x *= -1}
        var y = x * Math.tan(angle);
        x += c;
        pointList.push([x, y]);
    }
    //just creating the ellips
    for (var i = 0; i < pointList.length; i++) {
        geometry.vertices.push(new THREE.Vector3(pointList[i][0],0,pointList[i][1]));
    }
    geometry.vertices.push(new THREE.Vector3(pointList[0][0],0,pointList[0][1]));
    
    c_bodies[body].orbit.mesh = new THREE.Line(geometry, material);
    p_set(c_bodies[body].orbit.mesh, c_bodies[focus].mesh.position);
    
    scene.add(c_bodies[body].orbit.mesh);
}

/*----HELPERS----*/








function CREATE() {
    function OriginLine(data) {
        this.geometry = new THREE.Geometry();
        this.material = new THREE.LineBasicMaterial({color: data.color});
        this.geometry.vertices.push(new THREE.Vector3(0,0,0));
        this.geometry.vertices.push(new THREE.Vector3(data.point[0], data.point[1], data.point[2]));
        this.mesh = new THREE.Line(this.geometry, this.material);
        scene.add(this.mesh);
    }
    var line = {
        x: new OriginLine({color: 0xff0000, point: [10,0,0]}),
        y: new OriginLine({color: 0x00ff00, point: [0,10,0]}),
        z: new OriginLine({color: 0x0000ff, point: [0,0,10]})
    };
    
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
        zoom(1);
    } //-
    if (keyState[187]) {
        zoom(-1);
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
function zoom(length) {
    view.length += length * view.zoom_speed;
    if (view.length < 0) {view.length = 0}
    
    camUpdate();
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

function render() {
    requestAnimationFrame(render);
    
    
    checkKeys();
    camSet();
    renderer.render(scene, camera);
}