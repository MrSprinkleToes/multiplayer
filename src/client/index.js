import "./style.css";

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

var lastTime = performance.now();
/**
 * The main game loop.
 * @param {DOMHighResTimeStamp} t The current time
 */
function gameLoop(t) {
	var dt = (t - lastTime) / 1000;
	lastTime = t;

	console.log(dt);
	requestAnimationFrame(gameLoop);
}
gameLoop();