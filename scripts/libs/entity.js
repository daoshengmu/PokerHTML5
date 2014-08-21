
var entity = function() {

	this.width = 0;
	this.height = 0;
	this.scale = 1;
	this.x = 0;
	this.y = 0;
	this.image = null;
	this.imageWidth = 0;
	this.imageHeight = 0;


	// this.init = function(_width, _height, _scale) {
	// 	width = _width;
	// 	height = _height;
	// 	scale = _scale;
	// 	x = 0;
	// 	y = 0;
	// }

	// this.draw = function(ctx) {
	// 	alert("this is base entity");
	// };

	// this.image = function(img, imgWidth, imgHeight) {
	// 	image = img;
	// 	imageWidth = imgWidth;
	// 	imageHeight = imgHeight;
	// };
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

