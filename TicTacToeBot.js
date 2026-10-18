
let m= [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
function weightMATH(cordinate, dimension,matrix) {
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
class bot {
    id=0;
    // id 1 for x and -1 for o
    constructor(id){
        this.id=id;
    }
    setMatrix(matrix, x, y) {
        //1 mean player x
        if (this.id === 1) {
            matrix[x][y] = 1;
        } else if(this.id===-1){
            matrix[x][y] = -1;
        }
        return {x,y};
    }
    bot_thinks(x, y, matrix) {
        //x and y are cordinates of the oppenant last turn
        if (matrix[1][1] === 0) {
            return this.setMatrix(matrix,1,1);
        }
        if (x + y === 2 || x === y) {
            let dig1 = Math.abs(weightMATH(-1, 3,matrix)) === 2;
            let dig2 = Math.abs(weightMATH(-1, 4,matrix)) === 2;
            if (dig1) {
                return this.play(-1, 3 , matrix);
            } else if (dig2) {
                return this.play(-1, 4, matrix);
            };
        }
        let row = Math.abs(weightMATH(x, 1,matrix)) === 2;
        let colum = Math.abs(weightMATH(y, 2,matrix)) === 2;
        if (row) {
            return this.play(x, 1,matrix);
        } else if (colum) {
            return this.play(y, 2,matrix);
        }
        return this.randomMove(matrix);
    }
    play(cordinate, dimension, matrix) {
        let index = 0
        //1 dimension mean rows , 2 dimension mean colums 3 dimension mean diagonal 4 dimension mean anti diagonal
        //-1 cordinate mean we check the diagonal or anti diagonal
        if (cordinate >= 0) {
            if (dimension === 1) {
                for (index = 0; index < 3; index++) {
                    if (matrix[cordinate][index] === 0) {
                        return this.setMatrix(matrix,cordinate,index);
                    }
                }
            } else if (dimension === 2) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][cordinate] === 0) {
                        return this.setMatrix(matrix,index,cordinate);
                    }
                }
            }
        } else {
            if (dimension === 3) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][index] === 0) {
                        return this.setMatrix(matrix,index,index);
                    }
                }
            } else if (dimension === 4) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][2 - index] === 0) {
                        return this.setMatrix(matrix,index,(2-index));
                    }
                }
            }
        }
    }
    randomMove(matrix) {
        let x = 0, y;
        while (x < 3) {
            y = 0;
            while (y < 3) {
                if (matrix[x][y] === 0) {
                    return this.setMatrix(matrix,x,y);
                }
                y++;
            }
            x++;
        }
    }
    
}
function bot_wars(bot1,bot2){
    //test function for bot objects
    let turn=1;
    let war_end=false;
    let omove={x:1,y:1},xmove;
    while (turn !=10 && war_end===false) {
        if(turn%2 ===1 ){
            xmove=bot1.bot_thinks(omove.x, omove.y, m);
            console.log(xmove)
            console.log(`this is x move ${turn}:\n`);
            console.log(m),
            console.log("\n___________________________________")
            turn++
        }else{
            omove=bot2.bot_thinks(xmove.x,xmove.y , m);
            console.log(omove)
            console.log(`this is o move ${turn}:\n`);
            console.log(m);
            console.log("\n___________________________________")
            turn++
        }
    }
}
export let bot_O = new bot(-1);
let bot_X = new bot(1);
bot_wars(bot_X,bot_O);