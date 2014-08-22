
var entity = function() {

	this.width = 0;
	this.height = 0;
	this.scale = 1;
	this.x = 0;
	this.y = 0;
	this.image = null;
	this.imageWidth = 0;
	this.imageHeight = 0;
};

entity.prototype = entity;

entity.prototype.init = function(width, height, scale) {
 	this.width = width;
	this.height = height;
	this.scale = scale;
	this.x = 0;
	this.y = 0;
}

entity.prototype.draw = function(ctx) {
	alert("this is base entity");
}

entity.prototype.setImage = function(img, imgWidth, imgHeight) {
	this.image = img;
	this.imageWidth = imgWidth;
	this.imageHeight = imgHeight;
}

entity.prototype.setPos = function(x,y) {
	this.x = x;
	this.y = y;
}

entity.prototype.moveRight = function(shift) {
	this.x += shift;
}

entity.prototype.moveLeft = function(shift) {
	this.x -= shift;
}

entity.prototype.moveUp = function(shift) {
	this.y -= shift;
}

entity.prototype.moveDown = function(shift) {
	this.y += shift;
}


