var objects = [];
/**
 * Updates all objects in the game.
 * @param {number} dt The time since the last frame in seconds
 */
function updateObjects(dt) {
	for (var i = 0; i < objects.length; i++) {
		objects[i].update(dt);
	}
}
/**
 * Renders all objects in the game.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context
 */
function renderObjects(ctx) {
	for (var i = 0; i < objects.length; i++) {
		objects[i]._render(ctx);
	}
}

/**
 * @class GObj
 * Superclass for all game objects.
 */
export default class GObj {
	/**
	 * Create a new object
	 * @param {Vector2} position The position of the object
	 * @param {number} rotation The rotation of the object
	 */
	constructor(position, rotation = 0) {
		this.position = position;
		this.rotation = rotation;
		objects.push(this);
	}

	/**
	 * Renders the object to the canvas.
	 * @param {CanvasRenderingContext2D} ctx The 2D rendering context
	 */
	_render(ctx) {
		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation * Math.PI / 180);
		this.render(ctx);
		ctx.restore();
	}

	update() {} // subclasses should override this
	render() {} // subclasses should override this
}

export { updateObjects, renderObjects };