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

        var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        background = $("#game .background")[0];
         
        clear();

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
