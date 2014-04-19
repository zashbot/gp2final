
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = 
		(window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			return window.setTimeout(callback, 1000 / 60);
		});
}

utils = {};

// returns a random integer between min and max (inclusive)
getRandomInt = function(min, max) {
	var num = Math.floor( Math.random() * (max - min + 1) ) + min;
	if (num < .5) {
		if (num > -.5){
			num += 1.5;
		}	
	}
	return num;
}

//RESTART BUTTON
function reloadPage(){	
	location.reload();
}
//INFO BUTTON
function infoLine(){
	alert("This game was created by Anthony DeGrazia for his Game Programming class final project at the SRJC. Thanks to Brent MacRae for assistance.\n");	
}	
function instrLine(){
	alert("HOW TO PLAY: You're objective is to survive waves of asteroids and enemies! Press the ARROW KEYS to rotate, and press the SPACEBAR to shoot. When you shoot a large or small asteroid, you will teleport to its location. Use this to your advantage to dodge other asteroids, as well as the RED MENACE! You might find yourself being circled by the RED MENACE!, so make sure you shoot the orange MEGA-BOMB to kill all of the enemies surrounding you and wipe out all the asteroids! The game gets harder the longer you survive! Good luck soldier!\n");	
}	
/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
utils.captureMouse = function (element) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    var x, y;
    
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  
  return mouse;
};

utils.getRandomFloat = function(min, max) {
	return Math.random() * (max - min) + min;
}

utils.getDistance = function(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	return utils.getMagnitude(dx, dy);
}

utils.getMagnitude = function(x, y) {
	return Math.sqrt(x * x + y * y);
}

utils.areColliding = function(x1, y1, radius1, x2, y2, radius2) {
	return utils.getDistance(x1, y1, x2, y2) <= radius1 + radius2;
}

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = (alpha === undefined) ? 1 : alpha;
  //parse hex values
  var r = color >> 16 & 0xff,
      g = color >> 8 & 0xff,
      b = color & 0xff,
      a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb("+ r +","+ g +","+ b +")";
  } else {
    return "rgba("+ r +","+ g +","+ b +","+ a +")";
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
window.utils.intersects = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
};

