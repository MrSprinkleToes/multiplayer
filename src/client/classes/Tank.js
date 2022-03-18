import GObj from "./GObj";
import Vector2 from "../util/Vector2";
import tankImage from "./assets/img/tank_green.png";

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
		this.tankImg = new Image();
		this.tankImg.src = tankImage;
		this.direction = new Vector2(0, 0);
	}

	update(dt) {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
		this.velocity.mult(0.9); // decrease velocity
		if (this.velocity.mag() < 0.1) { // if velocity is too small, set it to zero
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
		let mag = this.velocity.mag();
		this.direction.x = this.velocity.x != 0 ? this.velocity.x / mag : 0; // if velocity is zero, keep direction
		this.direction.y = this.velocity.y != 0 ? this.velocity.y / mag : 0; // if velocity is zero, keep direction

		this.rotation = mag > 0.1 ? this.direction.angle() - 90 : this.rotation;

		if (this.p_update) {
			this.p_update(dt);
		}
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.drawImage(this.tankImg,
			0, 0,
			this.tankImg.width, this.tankImg.height,
			-20, -20,
			40, 40);

		// ctx.fillText(`${this.rotation}`, 20, 20);
	}
}