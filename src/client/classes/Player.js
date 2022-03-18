import Tank from "./Tank";

export default class Player extends Tank {
	constructor(position, socket, color = "lime") {
		super(position, color);
		this.name = "";
		this.score = 0;
		this.keysDown = {};
		this.socket = socket;

		window.addEventListener("keydown", (e) => {
			this.keysDown[e.key] = true;
		});
		window.addEventListener("keyup", (e) => {
			delete this.keysDown[e.key];
		});
	}

	p_update(dt) {
		if (this.keysDown["w"]) {
			this.acceleration.y = -1;
		} else if (this.keysDown["s"]) {
			this.acceleration.y = 1;
		} else {
			this.acceleration.y = 0;
		}

		if (this.keysDown["a"]) {
			this.acceleration.x = -1;
		} else if (this.keysDown["d"]) {
			this.acceleration.x = 1;
		} else {
			this.acceleration.x = 0;
		}

		this.socket.emit("update_plr", this.position, this.rotation);
	}
}