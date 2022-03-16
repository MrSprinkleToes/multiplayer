var players = {};

function init(socket) {
	socket.on("positions", (plrs) => {
		for (let id in plrs) {
			if (id !== socket.id) {
				var player = plrs[id];
				var p = player.position;
				players[id] = p;
			}
		}
	});
	socket.on("leave", (id) => {
		delete players[id];
	});
}

export { init, players };