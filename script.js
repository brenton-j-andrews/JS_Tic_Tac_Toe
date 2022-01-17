// domSelect module -> select all dom elements from html for use by other modules.
let domSelect = (function() {
    let info_text = document.getElementById("game-info");
    let game_squares = Array.from(document.getElementsByClassName("game_square"));
    let game_container = document.getElementById("game_container");
    let startBtn = document.getElementById("start-btn");

    return {
        info_text: info_text,
        game_squares: game_squares,
        startBtn: startBtn,
        game_container: game_container
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
    }
   
})();

// winningConditions module checks for move legality, passes legal moves to gameState, and checks if winning conditions present.
const winningConditions = (function() {

    let winningArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

    // Return true if move is legal.
    function checkLegalMove(move) {
        return gameState.game_board[move] === "" ? true : false;
    }

    function isTie() {
        let emptySquares = 0;
        for (let i = 0; i < 8; i++) {
            if (gameState.game_board[i] === "") emptySquares++;
        }
        
        return (emptySquares === 0) ? true : false;
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
        isTie: isTie
    }

})();

// singleGameFlow module -> Logic for game flow of one game of tic tac toe.
let singleGameFlow = (function() {
    let player1 = "x";
    let player2 = "o";
    let isX = false;
    let gameOver = false;
    
    // Add gameState array contents to display, add "click" event listener for each square.
    function fillBoard() {
        if (!gameOver) {
            console.log("test...")
            let i = 0;
            togglePlayerTurn();
            domSelect.startBtn.disabled = true;
            domSelect.game_squares.forEach(square => {
                square.textContent = gameState.game_board[i];
                square.addEventListener("click", listener, true);
                i++;
            });
        }
    }

    // EventListener helper function.
    function listener() {
        gameDriver(this);
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
                     domSelect.info_text.innerText = "X is the winner! \nPress Start to play again!";
                } else domSelect.info_text.innerText  = "O is the winner! \nPress Start to play again!";
                gameOver = true;
            }

            // Check for a drawn game.
            if (winningConditions.isTie()) {
                domSelect.info_text.innerText  = "It is a tie! \nPress Start to play again!";
            }

            // If game won, remove square eventListeners and return to programDriver function.
            if (gameOver) {
                domSelect.game_container.classList.add("game_over");
                square.removeEventListener("click", listener, true);
            }

            if (!gameOver) togglePlayerTurn();
        }
    }

    // Toggle player turn and change information text above the board.
    function togglePlayerTurn() {
        isX = !isX;
        isX === true ? domSelect.info_text.textContent = "X is up" : domSelect.info_text.textContent = "0 is up";

    }

    return {
        fillBoard: fillBoard,
        isX: isX,
        gameOver: gameOver
    }
})();

// programDriver module -> Initializes score and player objects, score display and calls singleGameFlow() to start another game.
let programDriver = (function() {
    domSelect.info_text.textContent = "Press the start button";
    domSelect.startBtn.addEventListener("click", singleGameFlow.fillBoard);
});

programDriver();