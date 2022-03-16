/**
 * @class Vector2
 * A 2D vector class. Implements some basic vector operations.
 */
export default class Vector2 {
	/**
	 * Constructs a new Vector2.
	 * @param {number} x The x component of the vector
	 * @param {number} y The y component of the vector
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
	}

	mult(s) {
		this.x *= s;
		this.y *= s;
	}

	div(s) {
		this.x /= s;
		this.y /= s;
	}

	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize() {
		var mag = this.mag();
		this.x /= mag;
		this.y /= mag;
	}
}