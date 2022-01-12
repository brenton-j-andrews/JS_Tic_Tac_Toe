// gameState module -> Stores information about the current game state.
let gameState = (function() {

    let _game_board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function _privateBoard() {
        return _game_board;
    }

    function publicBoard() {
        return _privateBoard();
    }

    return {
        publicBoard: publicBoard
    };
    
})();

// gameDisplay module -> Displays gameState._game_board on webpage.
let gameDisplay = (function() {
    let _html_game_squares = Array.from(document.getElementsByClassName("game_square"));
    let _boardCopy = gameState.publicBoard();
    
    function _fillBoard() {
        console.log(_boardCopy);
        let i = 0;
        _html_game_squares.forEach(square => {
            square.textContent = _boardCopy[i];
            i++;
        })
    }

    return {
        publicFillBoard: function() {
            _fillBoard();
        }
    }

})();

gameDisplay.publicFillBoard()
