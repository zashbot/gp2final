function Sprite(spriteSheet, x, y, speed) {
	this.spriteSheet = spriteSheet;
	this.x = x;
	this.y = y;
	this.speed = speed;
	
	this.frameTimeSeconds = 0;
	this.startFrame = 0;
	this.endFrame = 0;
	this.currentFrame = 0;
	this.animationTimer = 0;
	
	this.currentState = null;
}

Sprite.prototype.draw = function() {
	var row = (this.currentFrame / 3) | 0;
	var col = this.currentFrame % 3;
	context.drawImage(this.spriteSheet, col * frameWidth, row * frameHeight, frameWidth, frameHeight, (this.x - frameWidth * 0.5) | 0, (this.y - frameHeight * 0.5) | 0, frameWidth, frameHeight);
}

Sprite.prototype.update = function(elapsedTime) {
	
	// update current state
	if (this.currentState != null) {
		this.currentState.update(this, elapsedTime);
	}

	// update animation
	this.animationTimer += elapsedTime;
	
	// flip to the next frame
	if (this.animationTimer >= this.frameTimeSeconds) {
		this.animationTimer -= this.frameTimeSeconds;
		
		this.currentFrame += 1;
		
		// if all frames have been displayed, go back to first frame.
		if (this.currentFrame > this.endFrame) {
			this.currentFrame = this.startFrame;
		}
	}
}

Sprite.prototype.changeState = function(nextState) {
	if (this.currentState != null && this.currentState.exit != undefined) {
		this.currentState.exit(this);
	}
		
	this.currentState = nextState;
	
	if (this.currentState.enter != undefined) {
		this.currentState.enter(this);
	}
}