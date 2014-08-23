dsmu.display = (function() {
    var dom = dsmu.dom,
        $ = dom.$,
        canvas, ctx,
     //   cols, rows,        
     //   jewels,
    //    width,
     //   height,
        cursor,
        firstRun = true;

    function createBackground() {
//        var background = document.createElement("canvas"),
//            bgctx = background.getContext("2d");
//
//        dom.addClass(background, "background");
//        background.width = cols * jewelSize;
//        background.height = rows * jewelSize;
//
//        bgctx.fillStyle = "rgba(225,235,255,0.15)";
//        for (var x=0;x<cols;x++) {
//            for (var y=0;y<cols;y++) {
//                if ((x+y) % 2) {
//                    bgctx.fillRect(
//                        x * jewelSize, y * jewelSize,
//                        jewelSize, jewelSize
//                    );
//                }
//            }
//        }

          var canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d"),
          background = $("#game .background")[0];
          //rect = background.getBoundingClientRect(),
          //gradient,
        //  i;

          clear();
//        canvas.width = rect.width;
//        canvas.height = rect.height;
//
//        ctx.scale(rect.width, rect.height);
//
//        gradient = ctx.createRadialGradient(
//            0.25, 0.15, 0.5,
//            0.25, 0.15, 1
//        );
//        gradient.addColorStop(0, "rgb(55,65,50)");
//        gradient.addColorStop(1, "rgb(0,0,0)");
//        ctx.fillStyle = gradient;
//        ctx.fillRect(0, 0, 1, 1);
//
//        ctx.strokeStyle = "rgba(255,255,255,0.02)";
//        ctx.strokeStyle = "rgba(0,0,0,0.2)";
//        ctx.lineWidth = 0.008;
//        ctx.beginPath();
//        for (i=0;i<2;i+=0.020) {
//            ctx.moveTo(i, 0);
//            ctx.lineTo(i - 1, 1);
//        }
//        ctx.stroke();
        background.appendChild(canvas);
        return background;
    }
    
    function clear() {        
       ctx.fillStyle = '#000000';
       ctx.beginPath();
      //start drawing
       ctx.rect(0, 0, canvas.width, canvas.height);
      //draw rectangle from point (0, 0) to
      //(width, height) covering whole canvas
       ctx.closePath();
      //end drawing
       ctx.fill();
    }

    function setup() {
        var boardElement = $("#game-screen .game-board")[0];
        var rect = $("#game .background")[0].getBoundingClientRect();
         
        canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'scene');
        ctx = canvas.getContext("2d");
        dom.addClass(canvas, "board");
        canvas.width = rect.width;
        canvas.height = rect.height;

        boardElement.appendChild(canvas);
        boardElement.appendChild(createBackground());
        
         cursor = {
            x : 0,
            y : 0,
            selected : false
        };
    }

    function drawCircles( circles ) {
      //  var howManyCircles = 10, circles = [];

   //     for (var i = 0; i < howManyCircles; i++) 
    //      circles.push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100, Math.random() / 2]);
  
         for (var i = 0; i < circles.length; i++) {
              ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
          //white color with transparency in rgba
              ctx.beginPath();
              ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
          //arc(x, y, radius, startAngle, endAngle, anticlockwise)
          //circle has always PI*2 end angle
              ctx.closePath();
              ctx.fill();
            }
    }; 

    function redraw( drawList, callback) {
        clear();
        //drawCircles( circles );
        
        drawList.forEach(
          function(element) {
            element.draw(ctx);
          }
        );
        //drawPlayer( player );
        callback();
    }

    function initialize(callback) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw    
    };
})();
