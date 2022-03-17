import Tank from "./classes/Tank";
import Vector2 from "./util/Vector2";

var players = {};

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

function init(socket) {
	socket.on("positions", (plrs) => {
		for (let id in plrs) {
			if (id !== socket.id && players[id] !== undefined) {
				var player = plrs[id];
				var p = player.position;
				var ox = players[id].position.x;
				var oy = players[id].position.y;
				var t = 0;
				let animLoop = setInterval(() => {
					t += 0.1;
					if (t > 1) {
						clearInterval(animLoop);
						return;
					}
					players[id].position.x = lerp(ox, p.x, t);
					players[id].position.y = lerp(oy, p.y, t);
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