dsmu.screens["game-screen"] = (function() {
    var scene = poker.scene ,
            display = dsmu.display,          
            circles = [],
            nrOfPlatforms = 7,
            platforms = [],
            drawList = [],
            platformWidth = dsmu.settings.platformWidth,
            platformHeight = dsmu.settings.platformHeight,
            points = 0,
            howManyCircles = 10,
            mouseX, mouseY,
            marioWidth = dsmu.settings.marioWidth,
            marioHeight = dsmu.settings.marioHeight,
            gLoop,
            state = true,
            //canvas = document.createElement("canvas");
            dom = dsmu.dom,
            $ = dom.$,
            background = $("#game .background")[0],
            rect = background.getBoundingClientRect();

    function generatePlatforms() {
        var position = 0, type;
        for (var i = 0; i < nrOfPlatforms; i++) {
            type = ~~(Math.random() * 5);
            if (type === 0)
                type = 1;
            else
                type = 0;
            platforms[i] = new Platform(Math.random() * (rect.width - platformWidth), position, type);
            if (position < rect.height - platformHeight)
                position += ~~(rect.height / nrOfPlatforms);
        }
    }

    function dealCardToPlayers(numOfCards) {

        var dir1X, dirY, dir2X, dir2Y, dirMeX, dirMeY;
        var dealSpeed = 50;
        var normalize = 0;

        dir1X = player1.x - dealer.x;
        dir1Y = player1.y - dealer.y;

        // normailze 
        lens = Math.sqrt(dir1X * dir1X + dir1Y * dir1Y);
        dir1X = dir1X / lens;
        dir1Y = dir1Y / lens;

        var cards = [];
        var firstCard;

        for ( var i = 0; i < numOfCards; ++i ) {
            // send card to player1
            var card1 = generateCards();
            card1.setPos(dealer.x, dealer.y);
            card1.owner = player1;
            cards.push(card1);

            if ( i == 0 ) {
                firstCard = card1;
            } else {
                card2.nextCard = card1;
            }

            // send card to main character
            var cardMain = generateCards();
            cardMain.setPos(dealer.x, dealer.y);
            cardMain.owner = mainCharacter;
            card1.nextCard = cardMain;
            cards.push(cardMain);

            // send card to player2
            var card2 = generateCards();
            card2.setPos(dealer.x, dealer.y);
            card2.owner = player2;
            cardMain.nextCard = card2;
            cards.push(card2);

            // var currentLens = 0;
            // var progress = setInterval(function() {

            //     if (currentLens >= lens) {
            //         clearInterval(progress);
            //     } else {
            //         currentLens += dealSpeed;
            //         card.x = dealer.x + currentLens * dir1X;
            //         card.y = dealer.y + currentLens * dir1Y;
            //     }

            // }, 800);

            //drawList.push(card);
        }

        firstCard.move();
    }

    function generateCards() {
        var card = new cardEntity();

        card.init(128, 179, 0.6);
        card.setImage(dsmu.images['images/card-heartK.jpg'], 128, 179);

        return card;
    }

    window.onmousemove = function(e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
            if (player.X > mouseX) {
                player.moveLeft();
            } else if (player.X < mouseX) {
                player.moveRight();
            }
        };
        
    if (window.DeviceOrientationEvent) { 
        window.addEventListener("deviceorientation", function () {
         //   tilt([event.beta, event.gamma]);
         player.moveAccMove(event.gamma*0.5);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function () {       
         player.moveAccMove(event.acceleration.x);
        }, true);
    } else {
        window.addEventListener("MozOrientation", function () {       
            player.moveAccMove(orientation.x);
        }, true);
    }

//    if (window.DeviceMotionEvent == undefined)
//    {
//        document.onmousemove = function(e) {
//            mouseX = e.pageX;
//            mouseY = e.pageY;
//            if (player.X > mouseX) {
//                player.moveLeft();
//            } else if (player.X < mouseX) {
//                player.moveRight();
//            }
//        };
//
//
//    }
//    else
//    {
//        window.ondevicemotion = function(event)
//        {
//            var ax = event.accelerationIncludingGravity.x;  // -10 ~ +10
//            //ay = event.accelerationIncludingGravity.y;
//
//            player.moveAccMove(ax);
//
//        };
//    }

    var Platform = function(x, y, type) {
        var that = this;

        that.firstColor = '#FF8C00';
        that.secondColor = '#EEEE00';
        that.platformWidth = platformWidth;
        that.platformHeight = platformHeight;
        that.onCollide = function() {
            player.fallStop();
        };

        if (type === 1) {
            that.firstColor = '#AADD00';
            that.secondColor = '#698B22';
            that.onCollide = function() {
                player.fallStop();
                player.jumpSpeed = 50;
            };
        }

        that.x = ~~x;
        that.y = y;
        that.type = type;

        //NEW IN PART 5
        that.isMoving = ~~(Math.random() * 2);
        that.direction = ~~(Math.random() * 2) ? -1 : 1;

//        var ctx = canvas.getContext("2d");

//        that.draw = function(){
//        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
//        var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
//        gradient.addColorStop(0, that.firstColor);
//        gradient.addColorStop(1, that.secondColor);
//        ctx.fillStyle = gradient;
//        ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
//        };

        return that;
    };

    var checkCollision = function() {
        platforms.forEach(function(e, ind) {
            if (
                    (player.isFalling) &&
                    (player.X < e.x + platformWidth) &&
                    (player.X + player.width > e.x) &&
                    (player.Y + player.height > e.y) &&
                    (player.Y + player.height < e.y + platformHeight)
                    ) {
                e.onCollide();
            }
        }
        );
    };

    // var table = new (function() {
    //     var that = this;

    //     that.width = tableSize;
    //     that.height = tableSize;
    //     that.imageWidth = tableSize;
    //     that.imageHeight = tableSize;
    //     that.actualFrame = 1;
    //     that.X = 0;
    //     that.Y = 0;
    // })();
    var table = new tableEntity();
    var dealer = new dealerEntity();
    var player1 = new playerEntity();
    var player2 = new playerEntity();
    var mainCharacter = new playerEntity();
    var dealBtn = new dealBtnEntity();
    var camera = new cameraEntity();

    var player = new (function() {
        var that = this;
        //    that.image = new Image();     
        //  that.image.src = "angel.png";
        that.width = marioWidth;  // 65
        that.height = marioHeight;  // 95
        that.frames = 1;
        that.imageWidth = 65;
        that.imageHeight = 95;
        that.actualFrame = 0;
        that.X = 0;
        that.Y = 0;

        //   that.image = dsmu.images["images/angel.png"];

        that.isJumping = false;
        that.isFalling = false;
        that.jumpSpeed = 0;
        that.fallSpeed = 0;

        that.jump = function() {
            if (!that.isJumping && !that.isFalling) {
                that.fallSpeed = 0;
                that.isJumping = true;
                that.jumpSpeed = 17;
            }
        };

        that.checkJump = function() {
            //a lot of changes here

            if (that.Y > rect.height * 0.4) {
                that.setPosition(that.X, that.Y - that.jumpSpeed);
            }
            else {
                if (that.jumpSpeed > 10)
                    points++;
                // if player is in mid of the gamescreen
                // dont move player up, move obstacles down instead
                MoveCircles(that.jumpSpeed * 0.5);

                platforms.forEach(function(platform, ind) {
                    platform.y += that.jumpSpeed;

                    if (platform.y > rect.height) {
                        var type = ~~(Math.random() * 5);
                        if (type === 0)
                            type = 1;
                        else
                            type = 0;

                        platforms[ind] = new Platform(Math.random() * (rect.width - platformWidth), platform.y - rect.height, type);
                    }
                });
            }

            that.jumpSpeed--;
            if (that.jumpSpeed === 0) {
                that.isJumping = false;
                that.isFalling = true;
                that.fallSpeed = 1;
            }

        };

        that.fallStop = function() {
            that.isFalling = false;
            that.fallSpeed = 0;
            that.jump();
        };

        that.checkFall = function() {
            if (that.Y < rect.height - that.height) {
                that.setPosition(that.X, that.Y + that.fallSpeed);
                that.fallSpeed++;
            } else {
                if (points === 0)
                    that.fallStop();
                else
                    gameOver();
            }
        };

        that.moveLeft = function() {
            if (that.X > 0) {
                that.setPosition(that.X - 5, that.Y);
            }
        };

        that.moveRight = function() {
            if (that.X + that.width < rect.width) {
                that.setPosition(that.X + 5, that.Y);
            }
        };

        that.moveAccMove = function(a) {
            if ((that.X + that.width < rect.width) || (that.X > 0)) {
                that.setPosition(that.X + (5 * a), that.Y);

                if (that.X < 0)
                    that.X = 0;

                if (that.X + that.width > rect.width)
                    that.X = rect.width - that.width;
            }
        };

        that.setPosition = function(x, y) {
            that.X = x;
            that.Y = y;
        };

//        that.interval = 0;
//        that.draw = function() {
//            try {
//                ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
//            }
//            catch (e) {
//            }
//            ;
//
//            if (that.interval === 4) {
//                if (that.actualFrame === that.frames) {
//                    that.actualFrame = 0;
//                }
//                else {
//                    that.actualFrame++;
//                }
//                that.interval = 0;
//            }
//            that.interval++;
//        };
    })();

    function MoveCircles(deltaY) {
        for (var i = 0; i < howManyCircles; i++) {
            if (circles[i][1] - circles[i][2] > rect.height) {
                //the circle is under the screen so we change
                //informations about it 
                circles[i][0] = Math.random() * rect.width;
                circles[i][2] = Math.random() * 100;
                circles[i][1] = 0 - circles[i][2];
                circles[i][3] = Math.random() / 2;
            } else {
                //move circle deltaY pixels down
                circles[i][1] += deltaY;
            }
        }
    };

    function setupCircles()
    {
        //  var canvas = document.createElement("canvas");

        for (var i = 0; i < howManyCircles; i++)
            circles.push([Math.random() * rect.width, Math.random() * rect.height, Math.random() * 100, Math.random() / 2]);
    }
    ;

    function moveCircles(deltaY) {

        //    var canvas = document.createElement("canvas");
        for (var i = 0; i < howManyCircles; i++) {
            if (circles[i][1] - circles[i][2] > rect.height) {
                //the circle is under the screen so we change
                //informations about it 
                circles[i][0] = Math.random() * rect.width;
                circles[i][2] = Math.random() * 100;
                circles[i][1] = 0 - circles[i][2];
                circles[i][3] = Math.random() / 2;
            } else {
                //move circle deltaY pixels down
                circles[i][1] += deltaY;
            }
        }
    };

    function detectPlayAgain()
    {       
        dsmu.game.showScreen("game-over", points );           
    };

    function gameOver() {

        return;

        state = false;
        //  cancelRequestAnimationFrame(gameUpdate);
        clearTimeout(gLoop);
        setTimeout(function() {
            detectPlayAgain();         
        }, 100);

    }

    var gameUpdate = function() {
        //  function gameUpdate() {
        //  drawCircles();

        if (player.isJumping)
            player.checkJump();
        if (player.isFalling)
            player.checkFall();

        // player.draw();

        platforms.forEach(function(platform, index) {
            if (platform.isMoving) {
                if (platform.x < 0) {
                    platform.direction = 1;
                } else if (platform.x > rect.width - platformWidth) {
                    platform.direction = -1;
                }
                platform.x += platform.direction * (index / 2) * ~~(points / 100);
            }

            //        platform.draw();
        }
        );

        checkCollision();

        //  moveCircles( 0.8);

        display.redraw(circles, drawList, player, function() {
            // do nothing for now
        });

        if (state)
        {
            gLoop = setTimeout(gameUpdate, 1000 / 50);
        }
        // requestAnimationFrame(gameUpdate);
    };

    function swipeHandle() {
      var touchsurface = document.getElementById('scene'),
      startX,
      startY,
      dist,
      threshold = 150, //required min distance traveled to be considered swipe
      allowedTime = 200, // maximum time allowed to travel that distance
      elapsedTime,
      startTime
     
      // if (Modernizr.touch) {

      // } else {
      //   touchsurface.addEventListener('onmousedown', function(e){
      //       alert('dwdwd');
      //   });
      // }

        var move, start, end;
        var hammertime = new Hammer( touchsurface );
        hammertime.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }));
        hammertime.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL }));

        hammertime.on('panstart', function(e){
            move = e.direction;
            start = e.distance;
           
        });

        hammertime.on('panend', function(e){
            move = e.direction;
            end = e.distance;
            //var totalDistance = end - start;

            if (e.direction == Hammer.DIRECTION_RIGHT)
                camera.moveRight();
            
            else if (e.direction == Hammer.DIRECTION_LEFT)
                camera.moveLeft();

            else if (e.direction == Hammer.DIRECTION_UP)
                camera.moveUp();

            else if (e.direction == Hammer.DIRECTION_DOWN)
                camera.moveDown();
        });

     // function handleswipe(isrightswipe) {
     //          if (isrightswipe)
     //           alert('swipe right');
     //          else{
     //           alert('swipe left');
     //          }
     //         }
             
     //         touchsurface.addEventListener('touchstart', function(e){
     //          //touchsurface.innerHTML = ''
     //          var touchobj = e.changedTouches[0]
     //          dist = 0
     //          startX = touchobj.pageX
     //          startY = touchobj.pageY
     //          startTime = new Date().getTime() // record time when finger first makes contact with surface
     //          e.preventDefault()
             
     //         }, false)
             
     //         touchsurface.addEventListener('touchmove', function(e){
     //          e.preventDefault() // prevent scrolling when inside DIV
     //         }, false)
             
     //         touchsurface.addEventListener('touchend', function(e){
     //          var touchobj = e.changedTouches[0]
     //          dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
     //          elapsedTime = new Date().getTime() - startTime // get time elapsed
     //          // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
     //        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
     //        handleswipe(swiperightBol)
     //        e.preventDefault()
     //        }, false);

    }

    function run() {
        state = true;
        circles = [];
        points = 0;
        
        scene.initialize(function() {
            display.initialize(function() {
                swipeHandle();
                var tableSize = 80;
                player.image = dsmu.images["images/angel.png"];
                table.init(512, 288, tableSize);
                table.setImage(dsmu.images['images/table-felt.jpg'], 512, 288);
                table.setPos(0, rect.height * 0.5);

                dealer.init(256, 384, 0.6);
                dealer.setImage(dsmu.images['images/dealer.png'], 256, 384);
                dealer.setPos(0+tableSize, (rect.height * 0.5)-tableSize-(384*0.6*0.5));

                player1.init(256, 384, 0.6);
                player1.setImage(dsmu.images['images/player1.png'], 256, 384);
                player1.setPos(0, rect.height * 0.5);

                player2.init(256, 384, 0.6);
                player2.setImage(dsmu.images['images/player2.png'], 256, 384);
                player2.setPos(rect.width-256*0.6*0.5, rect.height * 0.5);

                mainCharacter.setPos(rect.width * 0.5, rect.height-179);

                dealBtn.setPos(0, rect.height);
                var sceneDom = $("#scene")[0];
                sceneDom.onclick = function(e) {
                    if ( (e.x >= 0) && (e.x <= 80)
                        && (e.y >= (rect.width-40) ) ) {
                            dealCardToPlayers(1);
                        }
                }

                cardEntity.dealer = dealer;
                cardEntity.drawList = drawList;
                cameraEntity.drawList = drawList;
                camera.moveSpeed = 20;

                // dealBtn.addEventListener('click', 
                // function(e) { 
                //     alert('wdwdwwd'); 
                // }, false);

                // Creating deal button
                // Dealing 2 cards to every player
                //drawList.push(generateCards(0, 0)); 

                drawList.push(table);
                drawList.push(dealer);
                drawList.push(player1);
                drawList.push(player2);
                drawList.push(dealBtn);

                // Initial Dealing cards
                dealCardToPlayers(2);


                // background = $("#game .background")[0];
                // var btn = document.createElement("div");
                // btn.setAttribute('id', 'dealButton');
                // background.appendChild(btn);
                // btn.style.position = 'absolute';
                // btn.style.bottom = '20px';
                // btn.style.zIndex = '2';
                // btn.onclick = function(e) {
                //     alert('11111');
                // }

                display.redraw(circles, drawList, player, function() {
                    // do nothing for now
                });
            });

            player.setPosition(~~((rect.width - player.width) / 2), ~~((rect.height - player.height) / 2));
            player.jump();
            //  requestAnimationFrame(gameUpdate);
            gameUpdate();

        });
        setupCircles();
        generatePlatforms();

        // requestAnimationFrame(gameUpdate);
    }

    return {
        run: run
    };
})();
