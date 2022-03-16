import "./style.css";
import { updateObjects, renderObjects } from "./classes/GObj";
import Tank from "./classes/Tank";
import Vector2 from "./util/Vector2";

const socket = io();
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "black";

var tank = new Tank(new Vector2(canvas.width / 2, canvas.height / 2));

var lastTime = performance.now();
/**
 * The main game loop.
 * @param {DOMHighResTimeStamp} t The current time
 */
function gameLoop(t) {
	var dt = (t - lastTime) / 1000;
	lastTime = t;

	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// console.log(dt);
	if (!isNaN(dt)) {
		updateObjects(dt);
		renderObjects(ctx);
	}
	requestAnimationFrame(gameLoop);
}
gameLoop();