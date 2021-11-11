"use strict"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let res = 10;

function create2DArray(length){
    let array2D = new Array(length);
    for(let i=0; i<length; i++){
        array2D[i] = new Array(length);
        for(let j=0; j<array2D[i].length; j++){
            array2D[i][j] = new Cell()
        }
    };
    return array2D;
};

function render(array){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length; j++){
            if(array[i][j].alive){
                let x = i*res
                let y = j*res
                ctx.fillRect(x, y, res-1, res-1)
            }
        }
    }
}
//create a grid object that wraps the 2D array, so we can create a new instance of it for 
//the next generation function

class Cell{ 
    constructor(){
        this.alive = false
        this.neighboursSum = 0
    }
    birth(){
        this.alive = true
    }
    kill(){
        this.alive = false
    }
    resetNeigbours(){
        this.neighboursSum = 0 
    }
}

function populateGrid(array){
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length; j++){
            array[i][j] = new Cell()
            if(Math.random()<0.5){
                array[i][j].birth()
                }
            }
        }
}
//
///
////
/////
//////
function findNeighbours(array, x, y){
    let sum = 0;
    
    if(array[x - 1][y - 1].alive){
        sum++
    }
    if(array[x][y - 1].alive){
        sum++
    }
    if(array[x + 1][y - 1].alive){
        sum++
    }
    if(array[x - 1][y].alive){
        sum++
    }
    if(array[x + 1][y].alive){
        sum++
    }
    if(array[x - 1][y + 1].alive){
        sum++
    }
    if(array[x][y + 1].alive){
        sum++
    }
    if(array[x + 1][y + 1].alive){
        sum++
    }
    return sum
}

function nextGeneration(oldGrid){
    let nextGrid = create2DArray(oldGrid.length)
    for(let i=1; i<nextGrid.length-1; i++){
        for(let j=1; j<nextGrid[i].length-1; j++){
            let neighboursSum = findNeighbours(oldGrid, i, j)
            let oldCell = oldGrid[i][j]
            let newCell = nextGrid[i][j]
            if((!oldCell.alive) && neighboursSum === 3){
                newCell.birth()
            }else if(oldCell.alive && (neighboursSum < 2 || neighboursSum > 3)){
                newCell.kill()
            }
            else{
                newCell.alive = oldCell.alive
            }
        }
    }
    render(nextGrid)
    return nextGrid
}
let grid = create2DArray(50)
populateGrid(grid)
render(grid)
setInterval(()=>grid = nextGeneration(grid), 1000)


