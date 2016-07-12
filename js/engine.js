var world = {
    c_bodies: [
        {
            name: 'sun',
            orbit: 'none',
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            geometry: 'new THREE.SphereGeometry(1)',
            material: 'new THREE.MeshBasicMaterial({color: 0xffff11})',
        },
        {
            name: 'earth',
            orbit: 'none',
            position: {
                x: 20,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            geometry: 'new THREE.SphereGeometry(1)',
            material: 'new THREE.MeshLambertMaterial({color: 0xff00ff, reflectivity: 1, emissive: 0x000000})',
        },
        {
            name: 'venus',
            orbit: 'none',
            position: {
                x: 5,
                y: 0,
                z: -10
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            geometry: 'new THREE.SphereGeometry(1)',
            material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1, emissive: 0x000000})',
        },
        {
            name: 'earth',
            orbit: 'none',
            position: {
                x: -20,
                y: 0,
                z: 15
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            geometry: 'new THREE.SphereGeometry(1)',
            material: 'new THREE.MeshLambertMaterial({color: 0x00ff00, reflectivity: 1, emissive: 0x000000})',
        }
    ],
    //list every player's socketID, in order
    p_list: [],
    players: {
        
        //each player's object will be named after their ID
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
    g_rules: {
        move_speed: 'etc'
    }
};


/*---- Module Exports ----*/
//module.exports.[variable/function] = [variable/function];
module.exports.world = world;