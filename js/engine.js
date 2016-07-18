function Body(data) {
    this.name = data.name;
    
    this.position = {
        x: data.position[0],
        y: data.position[1],
        z: data.position[2]
    };
    this.rotation = {
        x: data.rotation[0],
        y: data.rotation[1],
        z: data.rotation[2]
    };
    
    
    this.radius = data.radius;
    this.material = data.material;
    
    
    
    
    this.orbit = data.orbit;
}

var s_bodies = [
    new Body({
        name: 'sol',
        position: [0,0,0],
        rotation: [0,0,0],
        radius: 5,
        material: 'new THREE.MeshBasicMaterial({color: 0xffff11})',
        orbit: 'none'
    }),
    new Body({
        name: 'terra',
        position: [24,0,0],
        rotation: [0,0,0],
        radius: 1,
        material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1})',
        orbit: {
            focus: 'sol',
            apoapse: 19,
            periapse: 10
        }
    }),
    new Body({
        name: 'duna',
        position: [-9,0,0],
        rotation: [0,0,0],
        radius: 1,
        material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1})',
        orbit: {
            focus: 'sol',
            apoapse: 19,
            periapse: 4
        }
    })
],
    
    p_list = [],
    players = {
        socketID: {
            alias: ''
        }
    },
    
    g_rules = {
        move_speed: 'etc'
    };



/*---- Module Exports ----*/
module.exports.s_bodies = s_bodies;
module.exports.p_list = [];
module.exports.players = players;
module.exports.g_rules = g_rules;