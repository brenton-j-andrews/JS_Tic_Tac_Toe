// gameState module -> Stores information about the current game state.
let gameState = (function() {

    let game_board = ["","","","","","","","",""];

    function resetBoard() {
        game_board = ["","","","","","","","",""];
    }

    function addMove(move, marker) {
        game_board[move] = marker;
        console.log(game_board);

    }

    return {
        game_board: game_board,
        resetBoard: resetBoard,
        addMove: addMove
    };
   
})();


// gameDisplay module -> Displays gameState._game_board on webpage, controls game flow.
let singleGameFlow = (function() {
    let _html_game_squares = Array.from(document.getElementsByClassName("game_square"));
    let player1 = "x";
    let player2 = "o";
    let isX = true;

    function fillBoard() {
        let i = 0;
        _html_game_squares.forEach(square => {
            square.textContent = gameState.game_board[i];
            square.addEventListener("click", () => {
                if (winningConditions.checkLegalMove(square.id)) {

                    // Fill square / array.
                    if (isX) { 
                        square.textContent = player1; 
                        gameState.addMove(square.id, player1);
                    }
                    else {
                        square.textContent = player2; 
                        gameState.addMove(square.id, player2);
                    }
                    

                    // Check winning conditions, toggle player turn.
                    winningConditions.checkWinningConditions();
                    togglePlayerTurn();
                }

            });
            i++;
        })
    }

    function togglePlayerTurn() {
        isX = !isX;
        return isX;
    }

    return {
        fillBoard: fillBoard,
        isX: isX
    }

})();


// winningConditions checks for move legality, passes legal moves to gameState, calls publicFillBoard() and checks if winning conditions present.
const winningConditions = (function() {

    let winningArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

    // Return true if move is legal.
    function checkLegalMove(move) {
        if (gameState.game_board[move] === "") {
            return true;
        } else {
            return false;
        }
    }

    function checkWinningConditions() {
        console.log("next iteration...")
        winningArr.forEach(condition => {
            let winner = (gameState.game_board[condition[0]] === gameState.game_board[condition[1]]) && (gameState.game_board[condition[1]] === gameState.game_board[condition[2]] && gameState.game_board[condition[0]] != "");
            if (winner) {
                console.log("you win!");
                return true;
            }
        })
    }
    
    return {
        checkLegalMove: checkLegalMove,
        checkWinningConditions: checkWinningConditions
    }

})();


// player factory function -> Returns player object containing player name, wins, loses.
const playerFactory = (name, symbol) => {
    let character = symbol;
    let wins = 0;
    let loses = 0;
    let stats = () => console.log(name + " has " + wins + " wins and " + loses + " loses.");
    return { character, name, wins, loses, stats }
};


singleGameFlow.fillBoard();
