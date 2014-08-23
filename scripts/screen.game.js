dsmu.screens["game-screen"] = (function() {
    var scene = poker.scene ,
            display = dsmu.display,          
            drawList = [],
            points = 0,
            mouseX, mouseY,
            gLoop,
            state = true,
            dom = dsmu.dom,
            $ = dom.$,
            background = $("#game .background")[0],
            rect = background.getBoundingClientRect();

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
            
        };
        
    if (window.DeviceOrientationEvent) { 
        window.addEventListener("deviceorientation", function () {
         //   tilt([event.beta, event.gamma]);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function () {       
        }, true);
    } else {
        window.addEventListener("MozOrientation", function () {       

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

    var table = new tableEntity();
    var dealer = new dealerEntity();
    var player1 = new playerEntity();
    var player2 = new playerEntity();
    var mainCharacter = new playerEntity();
    var dealBtn = new dealBtnEntity();
    var camera = new cameraEntity();

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

        //  moveCircles( 0.8);

        display.redraw(drawList, function() {
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

    }

    function run() {
        state = true;
        points = 0;
        
        scene.initialize(function() {
            display.initialize(function() {
                swipeHandle();
                var tableSize = 80;
                table.init(512, 288, tableSize);
                table.setImage(dsmu.images['images/table-felt.jpg'], 512, 288);
                table.setPos(0, rect.height * 0.5);

                dealer.init(256, 384, 0.6);
                dealer.setImage(dsmu.images['images/dealer.png'], 256, 384);
                dealer.setPos(0+tableSize, (rect.height * 0.5)-tableSize-(384*0.6*0.5));

                player1.init(256, 384, 0.6);
                player1.setImage(dsmu.images['images/player1.png'], 256, 384);
                player1.setPos(0+tableSize+20, (rect.height * 0.5)-tableSize-(384*0.6*0.5));

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

                display.redraw( drawList, function() {
                    // do nothing for now
                });
            });

            // player.setPosition(~~((rect.width - player.width) / 2), ~~((rect.height - player.height) / 2));
            // player.jump();
             gameUpdate();
            
        });

    }

    return {
        run: run
    };
})();
