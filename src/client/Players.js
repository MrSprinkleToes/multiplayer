import Tank from "./classes/Tank";
import Vector2 from "./util/Vector2";

var players = {};

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

// https://gist.github.com/shaunlebron/8832585
function shortAngleDist(a0, a1) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}
function rot_lerp(a0, a1, t) {
	a0 = a0 * Math.PI / 180;
	a1 = a1 * Math.PI / 180;
	return (a0 + shortAngleDist(a0, a1) * t) * 180 / Math.PI;
}

function init(socket) {
	socket.on("positions", (plrs) => {
		for (let id in plrs) {
			if (id !== socket.id && players[id] !== undefined) {
				let player = plrs[id];
				let p = player.position;
				let ox = players[id].position.x;
				let oy = players[id].position.y;
				let or = players[id].rotation;
				let t = 0;
				let animLoop = setInterval(() => {
					t += 0.1;
					if (t > 1) {
						clearInterval(animLoop);
						return;
					}
					players[id].position.x = lerp(ox, p.x, t);
					players[id].position.y = lerp(oy, p.y, t);
					players[id].rotation = rot_lerp(or, player.rotation, t);
			}, 10);
			}
		}
	});
	socket.on("join", (id) => {
		players[id] = new Tank(new Vector2(0, 0));
		console.log(players);
	});
	socket.on("leave", (id) => {
		players[id].destroy();
		delete players[id];
	});
}

export { init, players };