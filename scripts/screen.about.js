/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

dsmu.screens["about"] = (function() {
    var game = dsmu.game,
        firstRun = true,
        dom = dsmu.dom,
        $ = dom.$; 
    
     function setup() {      
        var scr = $("#about ul.menu")[0];
        
        dom.bind(scr, "click", function(e) {
            if (e.target.nodeName.toLowerCase() === "button") {
                var action = e.target.getAttribute("name");
                game.showScreen(action);
            }
        });   
               
    }
    
     function run() {           
         if ( firstRun ) {
            setup();
            firstRun = false;
        }
    }    
    
    return {
        run : run    
    };
})();
