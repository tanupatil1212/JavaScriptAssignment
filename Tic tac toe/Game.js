

const Board = require("./Board");
const Player = require("./Player");

class Game {
    constructor(board, players) {
        this.players = players;
        this.board = board;
        this.turn = 0;
        this.isGameEnded = false;
    }

    static newGame(player0Name, player1Name) {
        // Validation of player0Name, player1Name
        if (typeof player0Name !== "string" || player0Name.trim() === "") {
            throw new Error("Player 1 name is required and should be a non-empty string.");
        }

        if (typeof player1Name !== "string" || player1Name.trim() === "") {
            throw new Error("Player 2 name is required and should be a non-empty string.");
        }

        let boardForGame = new Board();
        let player0 = new Player("X", player0Name.trim());
        let player1 = new Player("O", player1Name.trim());

        return new Game(boardForGame, [player0, player1]);
    }

    play(cellNumber) {
        // Validation cellNumber 0 to 8 and Number

        if (this.isGameEnded) {
            return "Game has Ended";
        }

        // Validate if cellNumber is a number
        if (typeof cellNumber !== "number" || isNaN(cellNumber)) {
            return "Invalid input. Please enter a valid cell number (0 to 8).";
        }

        // Validate if cellNumber is within the range 0 to 8
        if (cellNumber < 0 || cellNumber > 8) {
            return "Invalid cell number. Please choose a number between 0 and 8.";
        }
        if (!this.board.getCellObj(cellNumber).isEmpty()) {
            return "Cell Not empty";
        }

        let currentPlayer;
        if (this.turn % 2 === 0) {
            currentPlayer = this.players[0];
        } else {
            currentPlayer = this.players[1];
        }

        let cellObj = this.board.getCellObj(cellNumber);
        currentPlayer.markCell(cellObj);
        this.turn++;

        this.board.printBoard();
        let [symbolOfWinner, gameStatus] = this.board.analyseResult();
        if (gameStatus === "") {
            return "Continuous Playing";
        }
        if (gameStatus === "draw") {
            return "Game Ended as Draw";
        }
        if (symbolOfWinner === this.players[0].symbol) {
            this.isGameEnded = true;
            return this.players[0].name + " is Winner";
        }
        this.isGameEnded = true;
        return this.players[1].name + " is Winner";
    }
    resetGame() {
        this.board = new Board();
        this.turn = 0;
        this.isGameEnded = false;
    }
    
}

module.exports = Game;
