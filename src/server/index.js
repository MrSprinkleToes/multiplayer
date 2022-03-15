const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

io.on("connection", (socket) => {
	console.log("connect");
	socket.on("disconnect", () => {
		console.log("disconnect");
	});
});

http.listen(8080, () => {
	console.log("Server running on port 8080");
});