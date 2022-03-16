const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

const Vector2 = require("./util/Vector2");

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

var players = {};
io.on("connection", (socket) => {
	console.log("connect");
	players[socket.id] = {
		position: new Vector2.Vector2(0, 0)
	};
	socket.on("disconnect", () => {
		console.log("disconnect");
		socket.broadcast.emit("leave", socket.id);
		delete players[socket.id];
	});
	socket.on("update_pos", (pos) => {
		players[socket.id].position = pos;
	});
});

// update all clients
setInterval(() => {
	io.emit("positions", players);
}, 100);

http.listen(8080, () => {
	console.log("Server running on port 8080");
});