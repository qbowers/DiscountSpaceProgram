function Body(data) {
	this.name = data.name;

	this.position = {
		x: data.position[0] * g_rules.scale,
		y: data.position[1] * g_rules.scale,
		z: data.position[2] * g_rules.scale,
		actual: {
			x: data.position[0],
			y: data.position[1],
			z: data.position[2]
		}
	};
	this.rotation = {
		x: data.rotation[0],
		y: data.rotation[1],
		z: data.rotation[2],
	};


	this.radius = data.radius * g_rules.scale;
	this.radius_actual = data.radius;

	this.material = data.material;


	if (data.orbit != 'none') {
		this.orbit = {
			focus: data.orbit.focus,
			apoapse: data.orbit.apoapse * g_rules.scale,
			periapse: data.orbit.periapse * g_rules.scale,
			actual: {
				apoapse: data.orbit.apoapse,
				periapse: data.orbit.periapse
			}
		};
	} else {
		this.orbit = 'none';
	}
}





var g_rules = {
		move_speed: 'etc',
		au: 149597870700,
		scale: 1
	},
	s_bodies = [
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
			position: [7,0,0],
			rotation: [7,0,0],
			radius: 1,
			material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1})',
			orbit: {
				focus: 'sol',
				apoapse: 7,
				periapse: 10
			}
		}),
		new Body({
			name: 'duna',
			position: [20,0,0],
			rotation: [20,0,0],
			radius: 1,
			material: 'new THREE.MeshLambertMaterial({color: 0x0000ff, reflectivity: 1})',
			orbit: {
				focus: 'sol',
				apoapse: 20,
				periapse: 11
			}
		})
	];

//console.log(s_bodies);

/*---- Module Exports ----*/
module.exports.s_bodies = s_bodies;
module.exports.p_list = [];
//module.exports.players = players;
module.exports.g_rules = g_rules;