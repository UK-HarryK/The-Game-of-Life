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

function findNeighbours(array, x, y){
    let sum = 0;
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            let cell = array[x + i][y + j]
            if(cell.alive){
                if(!(i == x && j == y)){
                    sum++
                }
            }
        }
    }
    return sum
}

function nextGeneration(oldGrid){
    let nextGenGrid = create2DArray(oldGrid.length)
    for(let i=1; i<nextGenGrid.length-1; i++){
        for(let j=1; j<nextGenGrid[i].length-1; j++){
            oldGrid[i][j].neighboursSum = findNeighbours(oldGrid, i, j)
        }
    }
    for(let i=0; i<nextGenGrid.length; i++){
        for(let j=0; j<nextGenGrid[i].length; j++){
            if(oldGrid[i][j].alive){
                if(oldGrid[i][j].neighboursSum == 2 || oldGrid[i][j].neighboursSum == 3){
                    nextGenGrid[i][j].birth()
                }else{
                    nextGenGrid[i][j].kill()
                }
            }else{
                if(oldGrid[i][j].neighboursSum == 3){
                    nextGenGrid[i][j].birth()
                }else{
                    nextGenGrid[i][j].kill()
                }
            }
            oldGrid[i][j].resetNeigbours()
        }
    }
    render(nextGenGrid)
    return nextGenGrid
}
let grid = create2DArray(25)
populateGrid(grid)
render(grid)
setInterval(()=>grid = nextGeneration(grid), 1000)


