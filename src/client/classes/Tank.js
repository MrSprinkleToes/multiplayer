import GObj from "./GObj";
import Vector2 from "../util/Vector2";

/**
 * @class Tank
 */
export default class Tank extends GObj {
	/**
	 * 
	 * @param {Vector2} position The initial position of the tank
	 * @param {string} color The color of the tank
	 */
	constructor(position, color = "lime") {
		super(position);
		this.color = color;
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.maxSpeed = 5;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(-20, -20, 40, 40);

		ctx.fillText(`${this.velocity.x}, ${this.velocity.y}`, 20, 20);
	}
}