//the global variables
//dom elements
//the grid cells
const grid=document.querySelectorAll(".grid-item");
//score board elements
const layer3=document.getElementById("popup");
const layer2=document.getElementById("shadow");
const scoreX=document.getElementById("scorex");
const scoreO=document.getElementById("scoreo");
const winner=document.getElementById("winner");
//buttons
const rematch=document.getElementById("continue");
const reset=document.getElementById("exit");
//sounds
const popupSound=document.getElementById("popup-sound");
const clickSound=document.getElementById("click-sound");
const startSound=document.getElementById("start-sound");
//set fixed events
rematch.onclick=endgame;
reset.onclick=function() {
    scoreo=0;
    scorex=0;
    endgame();
}
//the arrays of cordinates
let xrow;
let xcolum;
let orow;
let ocolum;
let turn;
//player score
let scorex=0;
let scoreo=0;
// main function
function start() {
    turn=1;
    xrow=[];
    xcolum=[];
    orow=[];
    ocolum=[];
    startSound.currentTime=0;
    startSound.play();
    grid.forEach((item)=>{
    item.classList.add("usable");
    item.onclick=function(){
        //we check which player turn and change the cell acordinaly
        clickSound.currentTime=0;
        clickSound.play();
        if (turn%2===0) {
            item.parentElement.style.borderColor="hsl(350, 100%, 45%)";
            item.textContent="O";
            item.style.color="hsl(240, 100%, 40%)";
            // we add the cordinates of the new cell , disable it and change the player
            orow.push(Number(item.getAttribute("x")));
            ocolum.push(Number(item.getAttribute("y")));
            turn++;
            item.classList.remove("usable");
            item.onclick=null;
            //console logs
            console.log(orow,ocolum);
            //check if the state of match(win or draw)
            check("O",Number(item.getAttribute("x")),Number(item.getAttribute("y")));
        }else{
            // same as the above
            item.parentElement.style.borderColor="hsl(240, 100%, 45%)";
            item.textContent="X";
            item.style.color="hsl(350, 100%, 40%)";
            xrow.push(Number(item.getAttribute("x")));
            xcolum.push(Number(item.getAttribute("y")));
            turn++;
            item.classList.remove("usable");
            item.onclick=null;
            console.log(xrow,xcolum)
            check("X",Number(item.getAttribute("x")),Number(item.getAttribute("y")));
        };  
}});
}
function pop() {
    //pop the score board
    scoreX.textContent=scorex;
    scoreO.textContent=scoreo;
    layer3.style.zIndex="3";
    layer2.style.zIndex="2";
    startSound.currentTime=0;
    startSound.play();
}
function hide() {
    //hide score board
    popupSound.currentTime=0;
    popupSound.play();
    layer3.style.zIndex="-2";
    layer2.style.zIndex="-1";
}
function score(player) {
    //here we change the score the winner and display the score of the players
    if (player==="X") {
        scorex++
    } else {
        scoreo++
    }
    winner.textContent=`the winner is player ${player}`;
    pop();
}
function draw() {
    //check draw and if so end the game and display score
    if (turn===10) {
        winner.textContent=`IT S DRAW -_-`;
        score("X");
        score("O");
        pop();
    }
}
function check(player,row,colum) {
    //check each posiable wining state(colum,row,diagonal) and if so we end  the game and resart a new one
    // we start with colum and row first
    if (checkrow(player,row) || checkcolum(player,colum)) {
        score(player);
    //then we check if the cell is in the diagonal if so  we check it
    } else {
        if (row+colum===4 || row===colum) {
            if (checkdio(player,row,colum)) {
                score(player);
                return;
            };
            draw();
            return;
        };
        draw();
        return;
    };
}
function checkdio(player,row,colum) {
    //we see if we have 3 repatitions
    let repat=0;
    let index=0
    //we check the firt diagonal were x and y cordinates are the same
    if (row===colum) {
        //we check how many x`s have a row number the same as their colum number
        if (player==="X") {
            xrow.forEach(x => {
                if (x===xcolum[index]) {
                    repat++;
                }
                index++;
            });
        } else {
            //the same for o
            orow.forEach(o => {
                if (o==ocolum[index]) {
                    repat++;
                }
                index++;
            });
        }
    //in this case we work with the other diagonal were the number of row and colum combined are equal to 4
    } else {
        //here we check how many x have a row number plus colum number equal to 4
        if (player==="X") {
            xrow.forEach(x => {
                if (x+xcolum[index]===4) {
                    repat++;
                }
                index++;
            });
        //same for o
        } else {
            orow.forEach(o => {
                if (o+ocolum[index]===4) {
                    repat++;
                }
                index++;
            });
        }
    }
    //now we cheek if we reached 3 repatitions
    if (repat===3) {
        return true;
    } else {
        return false;
    }
}
function checkrow(player,row) {
    //we check if we have the same row cordinate 3 times if so return true and the match end
    let repat=0;
    //here if it x turn
    if (player==="X") {
        xrow.forEach((x)=>{
            if (x===row) {
                repat++;
            }
        })
    //here if it s o turn
    } else {
        orow.forEach((o)=>{
            if (o===row) {
                repat++;
            }
        })
    }
    // here we ccheck if the number of repatations reached 3
    if (repat===3) {
        return true;
    }else{
        return false;
    }
}
function checkcolum(player,colum) {
    //here we do the same as the checkrow functions but for colums
    let repat=0;
    if (player==="X") {
        xcolum.forEach((x)=>{
            if (x===colum) {
                repat++;
            }
        })
    } else {
        ocolum.forEach((o)=>{
            if (o===colum) {
                repat++;
            }
        })
    }
    if (repat===3) {
        return true;
    }else{
        return false;
    }
}
function endgame() {
    //we disable all the cells and back everthing to normal
    grid[0].parentElement.style.borderColor="hsl(0, 0%, 20%)";
    grid.forEach((item)=>{
        item.textContent="";
    });
    hide();
    start();

}
window.addEventListener("load", function() {
    start();
});