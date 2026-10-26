
let m = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
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
class bot {
    id = 0;
    // id 1 for x and -1 for o
    constructor(id) {
        this.id = id;
    }
    setMatrix(matrix, x, y) {
        //1 mean player x
        if (this.id === 1) {
            matrix[x][y] = 1;
        } else if (this.id === -1) {
            matrix[x][y] = -1;
        }
        return { x, y };
    }
    checkdig(row, colum,matrix) {
        if (row + colum === 2 || row === colum) {
            let dig1 = Math.abs(weightMATH(-1, 3, matrix)) === 2;
            let dig2 = Math.abs(weightMATH(-1, 4, matrix)) === 2;
            if (dig1) {
                return this.play(-1, 3, matrix);
            } else if (dig2) {
                return this.play(-1, 4, matrix);
            }
        }
        return { x: -1, y: -1 };
    }
    checknormal(row, colum,matrix) {
        let rowduo = Math.abs(weightMATH(row, 1, matrix)) === 2;
        let columduo = Math.abs(weightMATH(colum, 2, matrix)) === 2;
        if (rowduo) {
            return this.play(row, 1, matrix);
        } else if (columduo) {
            return this.play(colum, 2, matrix);
        }
            return { x: -1, y: -1 }
        
    }
    is_wining(botmove,matrix) {
        let wining_dig = this.checkdig(botmove.x, botmove.y,matrix);
        if (wining_dig.x >= 0) {
            return wining_dig;
        } else {
            let wininig_normal = this.checknormal(botmove.x, botmove.y,matrix);
            console.log(wininig_normal)
            if (wininig_normal.x >= 0) {
                return wininig_normal;
            }
            return { x: -1, y: -1 };
        }
    }
    is_loosing(x, y,matrix) {
        let loosing_dig = this.checkdig(x, y,matrix);
        if (loosing_dig.x >= 0) {
            return loosing_dig;
        } else {
            let loosing_normal = this.checknormal(x, y,matrix);
            if (loosing_normal.x >= 0) {
                return loosing_normal;
            }
            return { x: -1, y: -1 };
        }
    }
    bot_thinks(x, y, matrix) {
        //x and y are cordinates of the oppenant last turn
        let botmove = JSON.parse(localStorage.getItem("botmove"));
        console.log(botmove)
        let wining = this.is_wining(botmove,matrix)
        if (wining.x >= 0) {
            return wining;
        } else {
            let loosing = this.is_loosing(x, y,matrix)
            if (loosing.x >= 0) {
                return loosing;
            }
        }
        if (matrix[1][1] === 0) {
            return this.setMatrix(matrix, 1, 1);
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
                        return this.setMatrix(matrix, cordinate, index);
                    }
                }
            } else if (dimension === 2) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][cordinate] === 0) {
                        return this.setMatrix(matrix, index, cordinate);
                    }
                }
            }
        } else {
            if (dimension === 3) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][index] === 0) {
                        return this.setMatrix(matrix, index, index);
                    }
                }
            } else if (dimension === 4) {
                for (index = 0; index < 3; index++) {
                    if (matrix[index][2 - index] === 0) {
                        return this.setMatrix(matrix, index, (2 - index));
                    }
                }
            }
        }
        return{x:-1,y:-1};
    }
    randomMove(matrix) {
        let x = 0, y;
        while (x < 3) {
            y = 0;
            while (y < 3) {
                if (matrix[x][y] === 0) {
                    return this.setMatrix(matrix, x, y);
                }
                y++;
            }
            x++;
        }
    }

}
function bot_wars(bot1, bot2) {
    //test function for bot objects
    let turn = 1;
    let war_end = false;
    let omove = { x: 1, y: 1 }, xmove;
    while (turn != 10 && war_end === false) {
        if (turn % 2 === 1) {
            xmove = bot1.bot_thinks(omove.x, omove.y, m);
            console.log(xmove)
            console.log(`this is x move ${turn}:\n`);
            console.log(m),
                console.log("\n___________________________________")
            turn++
        } else {
            omove = bot2.bot_thinks(xmove.x, xmove.y, m);
            console.log(omove)
            console.log(`this is o move ${turn}:\n`);
            console.log(m);
            console.log("\n___________________________________")
            turn++
        }
    }
}
export let bot_O = new bot(-1);
