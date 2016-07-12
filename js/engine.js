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
}

var c_bodies = [
    new Body({
        name: 'sun',
        position: [0,0,0],
        rotation: [0,0,0],
        radius: 1,
        material: 'new THREE.MeshBasicMaterial({color: 0xffff11})'
    }),
    new Body({
        name: 'terra',
        position: [20,0,0],
        rotation: [0,0,0],
        radius: 1,
        material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1})'
    })
],
    p_list = [],
    players = {
        socketID: {
            alias: '',
            ships: [
                {
                    name: '',
                    position: '',
                    orbit: '',
                    geometry: '',
                    color: ''
                }
            ]
        }
    },
    g_rules = {
        move_speed: 'etc'
    };


/*---- Module Exports ----*/
//module.exports.[variable/function] = [variable/function];
module.exports.c_bodies = c_bodies;
module.exports.p_list = [];
module.exports.players = players;
module.exports.g_rules = g_rules;