// memo.js
/*
    Find couples game.
    (c) Baltasar baltasarq@gmail.com Aug 2017 MIT License
*/

var game = {
    "remaining": 0,
    "debug": false,
    "widths": [4, 5, 6, 7],
    "width": 0,
    "board": [],
    "numClicks": 0,
    "lastCellLoc": [ -1, 0 ],
    "res": [
        // "res/question.svg", // used for the back of each card
        "res/air_plane.svg",
        "res/balloons.svg",
        "res/baseball.svg",
        "res/basketball.svg",
        "res/bee.svg",
        "res/bicycle.svg",
        "res/boat.svg",
        "res/butterfly.svg",
        "res/cargo-ship.svg",
        "res/car.svg",
        "res/cheetah.svg",
        "res/chicken.svg",
        "res/chick.svg",
        "res/crab.svg",
        "res/dolphin.svg",
        "res/elephant.svg",
        "res/fire-extinguisher.svg",
        "res/fire-truck.svg",
        "res/fish.svg",
        "res/frog.svg",
        "res/hippopotamus.svg",
        "res/horse.svg",
        "res/light_bulb.svg",
        "res/lion.svg",
        "res/motorbike.svg",
        "res/parrot.svg",
        "res/police-car.svg",
        "res/rhino.svg",
        "res/robot.svg",
        "res/rocket.svg",
        "res/seahorse.svg",
        "res/snail.svg",
        "res/soccer_ball.svg",
        "res/sport_car.svg",
        "res/squid.svg",
        "res/tank-truck.svg",
        "res/tennis.svg",
        "res/transport_balloon.svg",
        "res/turtle.svg",
    ],
    "buildCellId":
        /** Returns the cell's id
         * @param row The row number of the cell.
         * @param col The column number of the cell.
         * @returns A string with the cell's id.
         */
        function(row, col) {
            return "cell-" + row + "-" + col;
        },
    "cellClick":
        /** Responds after clicking a cell */
        function(target) {
            var col = target.targetCellColNumber;
            var row = target.targetCellRowNumber;
            var value = this.board[ row ][ col ];
            var imgNode = document.getElementById(
                this.buildCellId( row, col )
            );
            
            // Debug
            this.writeLog( "Cell: "
                        + JSON.stringify( this.lastCellLoc )
                        + " value: " + value
                        + " numClicks: " + this.numClicks
                        + " is up: " + target.isUp );
            
            if ( !target.isUp ) {
                target.isUp = true;
                
                // Show the image
                this.showCell( imgNode );
                
                if ( this.lastCellLoc[ 0 ] < 0 ) {
                    // Avoid the first cell at 0, 0 being considered discovered
                    value = -1;
                    this.lastCellLoc[ 0 ] = 0;
                }
                 
                if ( value !=
                     this.board[ this.lastCellLoc[ 0 ] ][ this.lastCellLoc[ 1 ] ] )
               {
                    // Hide current figure in two seconds
                    var self = this;
                    setTimeout( 
                        function() {
                            if ( !imgNode.discovered ) {
                                target.isUp = false;
                                self.hideCell( row, col );
                            }
                        },
                        2000 );
                } else {
                    node = document.getElementById(
                                this.buildCellId(
                                    this.lastCellLoc[ 0 ],
                                    this.lastCellLoc[ 1 ] ) );
                    node.discovered = true;
                    imgNode.discovered = true;
                    --this.remaining;
                    
                    if ( this.remaining <= 0 ) {
                        this.remaining = 0;
                        this.endGame();
                    }
                }
                
                // Set the status changes
                ++this.numClicks;
                this.lastCellLoc[ 0 ] = row;
                this.lastCellLoc[ 1 ] = col;
                this.updateScore();
            }
        },
    "showCell":
        /** Shows the image behind the card.
         *  @param node The row number, or the cell object.
         *  @param col The col number.
         */
        function(node, col) {
            if ( typeof( node ) == "number" ) {
                node = document.getElementById( this.buildCellId( node, col ) );
            }
            
            var value =
                this.board[node.targetCellRowNumber][node.targetCellColNumber ];
            node.setAttribute( "src", this.res[ value ] );
        },
    "hideCell":
        /** Hides the image behind the card.
         *  @param node The row number, or the cell object.
         *  @param col The col number.
         */
        function(node, col) {
            if ( typeof( node ) == "number" ) {
                node = document.getElementById( this.buildCellId( node, col ) );
            }
            
            node.setAttribute( "src", "res/question.svg" );
        },
    "endGame":
        function() {
            var dvEndGame = document.getElementById( "dvEndGame" );
            
            dvEndGame.style.display = "block";
            dvEndGame.innerHTML = "<p>Well done!<br/> \
                                <button class='buttonClass'\
                                onclick=\"location.reload()\"/>\
                                Play again!</button></p>";
        },
    "updateScore":
        function() {
            var dvScore = document.getElementById( "dvScore" );
            
            dvScore.innerHTML = "Clicks: " + this.numClicks
                              + "<br/>Remaining: " + this.remaining
                              + "<br/>Target clicks: "
                              + ( this.width * this.width );
        },
    "init":
        /** Prepares the game to be played, specially the board.
         *  @param w The game width. It will be the same number of rows and cols.
         */
        function(w) {
            this.width = game.widths[ w ];
            var numFigures = this.res.length;
            var numCouples = ( this.width * this.width ) / 2;
            var usedFigures = [];
            
            this.remaining = numCouples;
            
            // Prepare used figures
            for(var i = 0; i < numFigures; ++i) {
                usedFigures.push( false );
            }
            
            // Prepare board
            for(var i = 0; i < this.width; ++i) {
                var row = [];
                for(var j = 0; j < this.width; ++j) {
                    row.push( 0 );
                }
                
                this.board.push( row );
            }
            
            // Set couples Math.floor( Math.random() * numFigures )
            for(var i = 0; i < numCouples; ++i) {
                var row = 0;
                var col = 0;
                
                // Set the chosen figure
                var numFigure = Math.floor( Math.random() * this.res.length );
                while ( usedFigures[ numFigure ] ) {
                    numFigure = Math.floor( Math.random() * this.res.length );
                }
                usedFigures[ numFigure ] = true;
                
                // Choose the first cell
                while ( this.board[ row ][ col ] != 0 ) {
                    var loc = this.getRandomCell();
                    row = loc[ 0 ];
                    col = loc[ 1 ];
                }
                
                this.board[ row ][ col ] = numFigure;
                
                // Choose the second cell
                while ( this.board[ row ][ col ] != 0 ) {
                    var loc = this.getRandomCell();
                    row = loc[ 0 ];
                    col = loc[ 1 ];
                }
                
                this.board[ row ][ col ] = numFigure;
            }
            
            this.updateScore();
            return;
        },
    "getRandomCell":
        /** Returns a random cell in the board.
         *  @returns A vector with both components of the cell's location.
         */
        function() {
            var toret = [ 0, 0 ];
                
            toret[ 0 ] = Math.floor( Math.random() * this.width );
            toret[ 1 ] = Math.floor( Math.random() * this.width );
            
            return toret;
        },
    "writeLog":
        /** Writes in the app's log, provided this.debug is true.
         *  @param s The string to write.
         */
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
            var imgNode = document.createElement( "img" );
            
            imgNode.setAttribute( "src", "res/question.svg" );
            imgNode.setAttribute( "class", "cellClass" );
            imgNode.setAttribute( "id", game.buildCellId( i, j ) );
            imgNode.targetCellRowNumber = i;
            imgNode.targetCellColNumber = j;
            
            tdCol.append( imgNode );
            tdCol.targetCellRowNumber = i;
            tdCol.targetCellColNumber = j;
            tdCol.isUp = false;
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
