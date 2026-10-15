let matrix=[
    [0,0,0],
    [1,0,0],
    [0,0,0]
]
function setMatrix(m,i,j,player){
    //1 mean player x
    if(player==1){
        m[i][j] = 1;
    }else{
        m[i][j] = -1;
    }
}
function play(x,y){
    
}