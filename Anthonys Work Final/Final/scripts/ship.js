function Ship () {
  this.x = 0;
  this.y = 0;
  this.width = 25;
  this.height = 20;
  this.rotation = 0;
  this.showFlame = false;
}

Ship.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  
  context.lineWidth = 1;
  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(10, 0);
  context.lineTo(-10, 10);
  context.lineTo(-5, 0);
  context.lineTo(-10, -10);
  context.lineTo(10, 0);
  context.stroke();

  if (this.showFlame) {
    context.beginPath();
    context.moveTo(-7.5, -5);
    context.lineTo(-15, 0);
    context.lineTo(-7.5, 5);
    context.stroke();
  }
  context.restore();
};
Ship.prototype.update = function(context) {
	ship.rotation += vr * Math.PI / 180;
	var angle = ship.rotation,
		ax = Math.cos(angle) * thrust,
		ay = Math.sin(angle) * thrust,
		left = 0,
		right = canvas.width,
		top = 0,
		bottom = canvas.height;

	vx += ax;
	vy += ay;
	vx *= friction;
	vy *= friction;
	ship.x += vx;
	ship.y += vy;

	//screen wrapping
	if (ship.x - ship.width / 2 > right) {
	  ship.x = left - ship.width / 2;
	} else if (ship.x + ship.width / 2 < left) {
	  ship.x = right + ship.width / 2;
	}
	if (ship.y - ship.height / 2 > bottom) {
	  ship.y = top - ship.height / 2;
	} else if (ship.y < top - ship.height / 2) {
	  ship.y = bottom + ship.height / 2;
	}
};