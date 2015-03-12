
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

    ctx.drawImage(this.image, 0, 0, 2, 2);

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

/** 
 *	Card entity 
**/
var cardEntity = function() {
	entity.call(this);

  this.nextCard;
  this.owner;

  this.move = function() {

    var dir1X, dirY, dir2X, dir2Y, dirMeX, dirMeY;
    var scope = this;
    var dealSpeed = 30;
    var normalize = 0;

    cardEntity.drawList.push(this);
    dir1X = this.owner.x - cardEntity.dealer.x;
    dir1Y = this.owner.y - cardEntity.dealer.y;

    // normailze 
    lens = Math.sqrt(dir1X * dir1X + dir1Y * dir1Y);
    dir1X = dir1X / lens;
    dir1Y = dir1Y / lens;

    var currentLens = 0;
    var progress = setInterval(function() {

      if (currentLens >= lens) {
          clearInterval(progress);

          if (scope.nextCard)
            scope.nextCard.move();
      } else {
          currentLens += dealSpeed;
          scope.x = cardEntity.dealer.x + currentLens * dir1X;
          scope.y = cardEntity.dealer.y + currentLens * dir1Y;
      }

    }, 100);
  }
}

cardEntity.prototype = new entity();

cardEntity.dealer = null;

cardEntity.drawList = null;

cardEntity.prototype.parent = entity.prototype;

cardEntity.prototype.draw = function(ctx) {
	ctx.drawImage(this.image, 0, 0, this.imageWidth
    , this.imageHeight, this.x, this.y, this.width * this.scale, this.height * this.scale);
};

/**
 *  Deal button entity
 **/
 var dealBtnEntity = function() {
    entity.call(this);
 }

dealBtnEntity.prototype = new entity();

dealBtnEntity.prototype.parent = entity.prototype;

dealBtnEntity.prototype.draw = function(ctx) {
	  //clear background
  	ctx.fillStyle = "red";
  	ctx.fillRect(this.x, this.y-40, 80, 40);
  	// draw font in red
  	ctx.fillStyle = "white";
  	ctx.font = "20pt sans-serif";
  	ctx.fillText("Deal", this.x+2, this.y-10);
};

/**
 *  Camera entity
 **/
 var cameraEntity = function() {
    entity.call(this);

    this.moveSpeed = 0;
 }

 cameraEntity.prototype = new entity();

 cameraEntity.prototype.parent = entity.prototype;

 cameraEntity.drawList = null;

 cameraEntity.prototype.moveRight = function() {

    var scope = this;

    cameraEntity.drawList.forEach(function(e) {

        e.moveLeft(scope.moveSpeed);
    });
 };

 cameraEntity.prototype.moveLeft = function() {

    var scope = this;

    cameraEntity.drawList.forEach(function(e) {

        e.moveRight(scope.moveSpeed);
    });
 };

 cameraEntity.prototype.moveUp = function() {

    var scope = this;

    cameraEntity.drawList.forEach(function(e) {

        e.moveDown(scope.moveSpeed);
    });
 };

 cameraEntity.prototype.moveDown = function() {

    var scope = this;

    cameraEntity.drawList.forEach(function(e) {

        e.moveUp(scope.moveSpeed);
    });
 };


