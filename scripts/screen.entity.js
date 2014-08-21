
/** 
 *	Table entity 
**/
var tableEntity = function() {
	entity.call(this);
}

tableEntity.prototype = new entity();  

tableEntity.prototype.parent = entity.prototype;

tableEntity.prototype.draw = function(ctx) {

 	ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale * 2, this.scale);
    ctx.arc(1, 1, 1, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(this.image, 0, 0, 50, 50);

    // ctx.beginPath();
    // ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
    // ctx.clip();
    // ctx.closePath();
    ctx.restore();
};

/** 
 *	Dealer entity 
**/
var dealerEntity = function() {
	entity.call(this);
}

dealerEntity.prototype = new entity();

dealerEntity.prototype.parent = entity.prototype;

dealerEntity.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, 0, 0, this.imageWidth
    , this.imageHeight, this.x, this.y, this.width * this.scale, this.height * this.scale);
};

/** 
 *	Player entity 
**/
var playerEntity = function() {
	entity.call(this);
}

playerEntity.prototype = new entity();

playerEntity.prototype.parent = entity.prototype;

playerEntity.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, 0, 0, this.imageWidth
    , this.imageHeight, this.x, this.y, this.width * this.scale, this.height * this.scale);
};
