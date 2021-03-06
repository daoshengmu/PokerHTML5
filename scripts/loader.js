var dsmu = {
    screens : {},
	settings : {
        rows : 8,
        cols : 8,
        baseScore : 100,
        numJewelTypes : 7
    },
    images : {}
};

var poker = {};

window.addEventListener("load", function() {

Modernizr.addTest("standalone", function() {
    return (window.navigator.standalone !== false);
});

// extend yepnope with preloading
yepnope.addPrefix("preload", function(resource) {
    resource.noexec = true;
    return resource;
});

var numPreload = 0,
    numLoaded = 0;

yepnope.addPrefix("loader", function(resource) {
    // console.log("Loading: " + resource.url)
    
    var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
    resource.noexec = isImage;

    numPreload++;
    resource.autoCallback = function(e) {
        // console.log("Finished loading: " + resource.url)
        numLoaded++;
        if (isImage) {
            var image = new Image();
            image.src = resource.url;
            dsmu.images[resource.url] = image;
        }
    };
    return resource;
});

function getLoadProgress() {
    if (numPreload > 0) {
        return numLoaded / numPreload;
    } else {
        return 0;
    }
}

// loading stage 1
Modernizr.load([
{ 
    test : Modernizr.localstorage,
    yep : "scripts/storage.js",
    nope : "scripts/storage.cookie.js"
}, {
    load : [
        "scripts/sizzle.js",
        "scripts/dom.js",
        "scripts/libs/hammer.min.js",
        "scripts/requestAnimationFrame.js",
        "scripts/libs/entity.js",
        "scripts/game.js"
    ]
},{
    test : Modernizr.standalone,
    yep : "scripts/screen.splash.js",
    nope : "scripts/screen.install.js",
    complete : function() {
        dsmu.game.setup();
        if (Modernizr.standalone) {
            dsmu.game.showScreen("splash-screen",
                getLoadProgress);
        } else {
            dsmu.game.showScreen("install-screen");
        }
    }
}
]);

// loading stage 2
if (Modernizr.standalone) {
    Modernizr.load([
    {
        test : Modernizr.canvas,
        yep : "loader!scripts/display.canvas.js"
    },{
        test : Modernizr.webworkers,
        yep : [
            "loader!scripts/board.worker-interface.js",
            "preload!scripts/board.worker.js"
        ],
        nope : "loader!scripts/board.js"
    },{
        load : [
            "loader!scripts/screen.main-menu.js",
            "loader!scripts/screen.entity.js",
            "loader!scripts/screen.game.js",
            "loader!scripts/screen.gameover.js",
            "loader!scripts/screen.about.js",
            "loader!scripts/screen.hiscore.js",
            "loader!images/table-felt.jpg",
            "loader!images/player_1.png",
            "loader!images/player_2.png",
            "loader!images/dealer.png",
            "loader!images/card-heartK.jpg",
        ]
    }
    ]);
}



}, false);
