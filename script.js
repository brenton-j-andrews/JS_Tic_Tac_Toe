// domSelect module -> select all dom elements from html for use by other modules.
let domSelect = (function() {
    let info_text = document.getElementById("game-info");
    let game_squares = Array.from(document.getElementsByClassName("game_square"));
    let startBtn = document.getElementById("start-btn");

    return {
        info_text: info_text,
        game_squares: game_squares,
        startBtn: startBtn
    }
})();


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


// winningConditions module checks for move legality, passes legal moves to gameState, and checks if winning conditions present.
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
        for (let i = 0; i < winningArr.length; i++) {
            let a = gameState.game_board[winningArr[i][0]];
            let b = gameState.game_board[winningArr[i][1]];
            let c = gameState.game_board[winningArr[i][2]];
            let winner = (a === b && b === c && c != "");
            if (winner) return true;
        }

        return false;
    }
    
    return {
        checkLegalMove: checkLegalMove,
        checkWinningConditions: checkWinningConditions,
    }

})();


// singleGameFlow module -> Logic for game flow of one game of tic tac toe.
let singleGameFlow = (function() {
    let player1 = "x";
    let player2 = "o";
    let isX = false;
    let gameWon = null;


    // Add gameState array contents to display, add event listener for each square.
    function fillBoard() {
        let i = 0;
        togglePlayerTurn();
        domSelect.game_squares.forEach(square => {
            square.textContent = gameState.game_board[i];
            square.addEventListener("click", function() {
                gameDriver(square);
            });

            i++;
        });
    }

    // Game script function.
    function gameDriver(square) {
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
            
    
            // Check winning conditions. 
            if (winningConditions.checkWinningConditions()) {
                if (isX === true) {
                     domSelect.info_text.textContent = "X is the winner!";
                } else domSelect.info_text.textContent = "O is the winner!";
                gameWon = true;
            }
            
            if (!gameWon) togglePlayerTurn();
        }
    }

    // Toggle player turn and change information text above the board.
    function togglePlayerTurn() {
        isX = !isX;
        isX === true ? domSelect.info_text.textContent = "X is up" : domSelect.info_text.textContent = "0 is up";
        return isX;
    }

    return {
        fillBoard: fillBoard,
        isX: isX,
        gameWon: gameWon
    }

})();


// programDriver module -> Initializes score and player objects, score display and calls singleGameFlow() to start another game.
let programDriver = (function() {
    domSelect.info_text.textContent = "Press the start button"
    domSelect.startBtn.addEventListener("click", singleGameFlow.fillBoard, false);
});

programDriver();