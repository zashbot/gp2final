function Particle() {
	this.age = 0;
	this.lifespan = 0;
	this.alpha = 1.0;
	this.alphaDelta = 0.0;
	this.scale = 1.0;
	this.offCenterScale = 1.0;
	this.rotation = 0.0;
	this.rotationSpeed = 0.0;
}

function Emitter() {
	this.x = 0;
	this.y = 0;
	
	this.scale = [1, 1];
	this.offCenterScale = [1, 1];
	this.rotationSpeed = [0, 0];
	
	this.time =  0;
	this.particles = [];
}

Emitter.prototype.update = function(deltaTimeSeconds) {
	this.time += deltaTimeSeconds;
					
	while(this.time > 1 / this.spawnRate) {
		this.spawnParticle();
		this.time -=  1 / this.spawnRate;
	}
	
	var numParticles = this.particles.length;
	
	for(var i = numParticles - 1; i >= 0; --i) {
		var p = this.particles[i];
	
		p.vx += this.gravityX * deltaTimeSeconds;
		p.vy += this.gravityY * deltaTimeSeconds;
		
		p.x += p.vx * deltaTimeSeconds;
		p.y += p.vy * deltaTimeSeconds;
		
		p.age += deltaTimeSeconds;
		p.alpha += p.alphaDelta * deltaTimeSeconds;
		
		p.rotation += p.rotationSpeed * deltaTimeSeconds;
						
		// remove particles that are no longer visible.
		if(p.alpha < 0 || p.age >= p.lifespan) {
			this.particles.splice(i, 1);
		}
	}
}

Emitter.prototype.spawnParticle = function() {
	var particle = new Particle();
		
	particle.x = this.x;
	particle.y = this.y;
		
	var angle = utils.getRandomFloat(this.angle[0], this.angle[1]);
	var speed = utils.getRandomFloat(this.speed[0], this.speed[1]);
			
	particle.vx = Math.cos(angle) * speed;
	particle.vy = Math.sin(angle) * speed;
	
	particle.lifespan = utils.getRandomFloat(this.lifespan[0], this.lifespan[1]);
	particle.alpha = utils.getRandomFloat(this.alpha[0], this.alpha[1]);
	particle.alphaDelta = utils.getRandomFloat(this.alphaDelta[0], this.alphaDelta[1]);
	particle.scale = utils.getRandomFloat(this.scale[0], this.scale[1]);
	particle.offCenterScale = utils.getRandomFloat(this.offCenterScale[0], this.offCenterScale[1]);
	particle.rotationSpeed = utils.getRandomFloat(this.rotationSpeed[0], this.rotationSpeed[1]);
	
	this.particles.push(particle);
}

Emitter.prototype.draw = function() {
	context.save();
		
	context.globalCompositeOperation = this.compositeMode;	
		
	var numParticles = this.particles.length;
	
	for(var i = numParticles - 1; i >= 0; --i) {
		var p = this.particles[i];
		
		context.save();
		context.globalAlpha = p.alpha;
		
		context.translate(p.x, p.y);
		context.rotate(p.rotation);
		context.scale(p.scale, p.scale);
		context.translate(-p.x, -p.y);
		
		context.drawImage(this.particleImage, p.x - this.particleImage.width / 2, p.y - this.particleImage.height / 2, p.offCenterScale * this.particleImage.width, p.offCenterScale * this.particleImage.height);
				
		context.restore();
	}
	
	context.restore();
}