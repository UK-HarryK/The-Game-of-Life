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
    let left = x - 1 
    let right = x + 1
    let top = y - 1 
    let bottom = y + 1
    if(left < 0){
        left = array.length - 1
    }
    if(right > array.length - 1){
        right = 0
    }
    if(top < 0){
        top = array[x].length -1
    }
    if(bottom > array[x].length - 1){
        bottom = 0
    }
    if(array[left][top].alive){
        sum++
    }
    if(array[x][top].alive){
        sum++
    }
    if(array[right][top].alive){
        sum++
    }
    if(array[left][y].alive){
        sum++
    }
    if(array[right][y].alive){
        sum++
    }
    if(array[left][bottom].alive){
        sum++
    }
    if(array[x][bottom].alive){
        sum++
    }
    if(array[right][bottom].alive){
        sum++
    }
    return sum
}

function nextGeneration(oldGrid){
    let nextGrid = create2DArray(oldGrid.length)
    for(let i=0; i<nextGrid.length; i++){
        for(let j=0; j<nextGrid[i].length; j++){
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
let grid = create2DArray(100)
populateGrid(grid)
render(grid)
setInterval(()=>grid = nextGeneration(grid), 100)