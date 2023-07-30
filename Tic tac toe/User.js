const Game=require("./Game");

let g1 = Game.newGame("Tanuja", "Sneha");
let g2 = Game.newGame("Dipika", "Rasika");

console.log(g1.play(0));
console.log("This is second game");
console.log(g2.play(1));

console.log(g1.play(4));
console.log("This is second game");
console.log(g2.play(7));

console.log(g1.play(1));
console.log("This is second game");
console.log(g2.play(5));

// Reset the first game (g1)
g1.resetGame();
console.log("Game 1 has been reset.");

// Now you can continue playing g1 or start a new game
console.log(g1.play(2));
console.log(g1.play(6));
console.log(g1.play(3));
console.log(g1.play(5));
console.log(g1.play(7));
console.log(g1.play(8));
