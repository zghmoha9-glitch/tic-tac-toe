//import bot
import { bot_O } from "./TicTacToeBot.js";
let matchend=false;
//the global variables
//dom elements
//the grid cells
const grid = document.querySelectorAll(".grid-item");
//score board elements
const layer3 = document.getElementById("popup");
const layer2 = document.getElementById("shadow");
const scoreX = document.getElementById("scorex");
const scoreO = document.getElementById("scoreo");
const winner = document.getElementById("winner");
//buttons
const rematch = document.getElementById("continue");
const reset = document.getElementById("exit");
//sounds
const popupSound = document.getElementById("popup-sound");
const clickSound = document.getElementById("click-sound");
const startSound = document.getElementById("start-sound");
//set fixed events
rematch.onclick = endgame;
reset.onclick = function () {
    scoreo = 0;
    scorex = 0;
    endgame();
}
//the arrays of cordinates
let matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let turn;
//player score
let scorex = 0;
let scoreo = 0;
// main function
function updateGameStatus(player, item) {
    // we add the cordinates of the new cell , disable it and change the player
    //we check which player turn and update the cell acordinaly
    if (player === "O") {
        item.parentElement.style.borderColor = "hsl(350, 100%, 45%)";
        item.style.color = "hsl(240, 100%, 40%)";
    } else {
        item.parentElement.style.borderColor = "hsl(240, 100%, 45%)"; 
        item.style.color = "hsl(350, 100%, 40%)";
    }
    item.textContent = `${player}`;
    item.classList.remove("usable");
    item.onclick = null;
    //check if the state of match(win or draw)
    check(`${player}`, Number(item.getAttribute("x")), Number(item.getAttribute("y")), matrix);
}
function botTurn(cord) {
    let botmove=bot_O.bot_thinks(cord.x,cord.y,matrix);
    const item=document.getElementById(`${botmove.x*3+ botmove.y+ 1}`);
    updateGameStatus("O",item);
}
function playTurn(item) {
    if (turn % 2 === 1) {
        let xmove = { x: Number(item.getAttribute("x")), y: Number(item.getAttribute("y")) }
        matrix[xmove.x][xmove.y] = 1;
        updateGameStatus("X", item);
        turn++
        if (JSON.parse(localStorage.getItem("isbot")) && !matchend) {
            const timer=setTimeout(botTurn(xmove),5000);
            clearTimeout(timer);
            turn++
            return;
        }
    } else if(!JSON.parse(localStorage.getItem("isbot"))) {
        matrix[Number(item.getAttribute("x"))][Number(item.getAttribute("y"))] = -1;
        updateGameStatus("O", item);
        turn++
    }
}
function startgame() {
    turn = 1;
    startSound.currentTime = 0;
    startSound.play();
    grid.forEach((item) => {
        item.classList.add("usable");
        item.onclick = function () {
            clickSound.currentTime=0
            clickSound.play();
            playTurn(item);
        }
    })
    
}
function pop() {
    //pop the score board
    scoreX.textContent = scorex;
    scoreO.textContent = scoreo;
    layer3.style.zIndex = "3";
    layer2.style.zIndex = "2";
    startSound.currentTime = 0;
    startSound.play();
}
function hide() {
    //hide score board
    popupSound.currentTime = 0;
    popupSound.play();
    layer3.style.zIndex = "-2";
    layer2.style.zIndex = "-1";
}
function score(player) {
    //here we change the score the winner and display the score of the players
    if (player === "X") {
        scorex++
    } else {
        scoreo++
    }
    winner.textContent = `the winner is player ${player}`;
    matchend=true;
    pop();
}
function draw() {
    //check draw and if so end the game and display score
    if (turn === 9) {
        winner.textContent = `IT S DRAW -_-`;
        pop();
    }
}
function check(player, row, colum, matrix) {
    //check each posiable wining state(colum,row,diagonal) and if so we end  the game and resart a new one
    // we start with colum and row first
    if (isWining(row, colum, matrix)) {
        score(player)
        return;
    }
    draw();
}
function endgame() {
    //we disable all the cells and back everthing to normal
    matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    matchend=false;
    grid[0].parentElement.style.borderColor = "hsl(0, 0%, 20%)";
    grid.forEach((item) => {
        item.textContent = "";
    });
    hide();
    startgame();

}
window.addEventListener("load", function () {
    startgame();
});
function weightMATH(cordinate, dimension, matrix) {
    let counter = 0;
    let index = 0
    //1 dimension mean rows , 2 dimension mean colums 3 dimension mean diagonal 4 dimension mean anti diagonal
    //-1 cordinate mean we check the diagonal or anti diagonal
    if (cordinate >= 0) {
        if (dimension === 1) {
            for (index = 0; index < 3; index++) {
                counter = counter + matrix[cordinate][index];
            }
        } else if (dimension === 2) {
            for (index = 0; index < 3; index++) {
                counter = counter + matrix[index][cordinate];
            }
        }
    } else {
        if (dimension === 3) {
            for (index = 0; index < 3; index++) {
                counter = counter + matrix[index][index];
            }
        } else if (dimension === 4) {
            for (index = 0; index < 3; index++) {
                counter = counter + matrix[index][2 - index];
            }
        }
    }
    return counter;
}
function isWining(cordinateX, cordinateY, matrix) {
    //cord x mean row and y mean column
    if (cordinateX + cordinateY === 2 || cordinateX === cordinateY) {
        let dig1 = Math.abs(weightMATH(-1, 3, matrix)) === 3;
        let dig2 = Math.abs(weightMATH(-1, 4, matrix)) === 3;
        if (dig1 || dig2) {
            return true;
        };
    }
    let row = Math.abs(weightMATH(cordinateX, 1, matrix)) === 3;
    let colum = Math.abs(weightMATH(cordinateY, 2, matrix)) === 3;
    if (row || colum) {
        return true;
    }
    return false;
}