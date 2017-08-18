// memo.js
/*
    Find couples game.
    (c) Baltasar baltasarq@gmail.com Aug 2017 MIT License
*/

var game = {
    "debug": true,
    "widths": [4, 6, 8, 16],
    "width": 0,
    "board": [],
    "res": [
        "air_plane.svg",
        "balloons.svg",
        "baseball.svg",
        "basketball.svg",
        "bee.svg",
        "bicycle.svg",
        "boat.svg",
        "butterfly.svg",
        "cargo-ship.svg",
        "car.svg",
        "cheetah.svg",
        "chicken.svg",
        "chick.svg",
        "crab.svg",
        "dolphin.svg",
        "elephant.svg",
        "fire-extinguisher.svg",
        "fire-truck.svg",
        "fish.svg",
        "frog.svg",
        "hippopotamus.svg",
        "horse.svg",
        "light_bulb.svg",
        "lion.svg",
        "motorbike.svg",
        "parrot.svg",
        "police-car.svg",
        "question.svg",
        "rhino.svg",
        "robot.svg",
        "rocket.svg",
        "seahorse.svg",
        "snail.svg",
        "soccer_ball.svg",
        "sport_car.svg",
        "squid.svg",
        "tank-truck.svg",
        "tennis.svg",
        "transport_balloon.svg",
        "turtle.svg",
    ],
    "cellClick":
        /** Responds after clicking a cell */
        function(target) {
            var col = target.targetCellColNumber;
            var row = target.targetCellRowNumber;
            var value = this.board[ row ][ col ];
            
            this.writeLog( "Cell: "
                        + JSON.stringify( [ row, col ] )
                        + " value: " + value );
        },
    "init":
        /** Prepares the game to be played, specially the board.
         *  @param w The game width. It will be the same number of rows and cols.
         */
        function(w) {
            var numFigures = 
            
            this.width = game.widths[ w ];            
            
            for(var i = 0; i < this.width; ++i) {
                var row = [];
                for(var j = 0; j < this.width; ++j) {
                    row.push( Math.floor( Math.random() * this.res.length ) );
                }
                
                this.board.push( row );
            }
        },
    "writeLog":
        function(s) {
            if ( this.debug ) {
                var dvConsole = document.getElementById( "dvConsole" );
                
                dvConsole.style.display = "block";
                dvConsole.append( document.createTextNode( s ) );
                dvConsole.append( document.createElement( "br" ) );
                dvConsole.scrollTop = dvConsole.scrollHeight;
            }
        },
};

function startGame()
{
    var dvStart = document.getElementById( "dvStart" );
    var dvBoard = document.getElementById( "dvBoard" );
    var tbBoard = document.getElementById( "tbBoard" );
    var opGame = document.getElementById( "opGame" );
    
    dvBoard.style.display = "block";    
    dvStart.style.display = "none";
    
    // Prepare game logic
    game.init( parseInt( opGame.value ) );
    
    // Prepare view
    for(var i = 0; i < game.width; ++i) {
        var trRow = document.createElement( "tr" );
        tbBoard.append( trRow );
        
        for(var j = 0; j < game.width; ++j) {
            var tdCol = document.createElement( "td" );
            
            tdCol.setAttribute( "align", "center" );
            tdCol.append( document.createTextNode( "Couple" ) );
            tdCol.targetCellRowNumber = i;
            tdCol.targetCellColNumber = j;
            tdCol.addEventListener( "click", function() {
                game.cellClick(this);
            });
            trRow.append( tdCol );
        }        
    }

    return;
}

function boot()
{
    var dvStart = document.getElementById( "dvStart" );
    var dvBoard = document.getElementById( "dvBoard" );
    
    dvStart.style.display = "block";
    dvBoard.style.display = "none";
}

window.onload = boot;
