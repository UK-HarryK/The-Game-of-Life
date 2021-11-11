"use strict"

const canvas:HTMLCanvasElement = document.getElementById("canvas")!;
const ctx:CanvasRenderingContext2D = canvas.getContext("2d")!;
let grid:Array<Array<Cell>>;
let res = 10;

function create2DArray(length:number){
    grid = new Array(length);
    for(let i=0; i<grid.length; i++){
        grid[i] = new Array(length);
    };
};
function render(){
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            if(grid[i][j].alive){
                let x = i*res
                let y = j*res
                ctx.fillRect(x, y, res-1, res-1)
            }
        }
    }
}
class Cell{
    alive:boolean
    neighboursSum:number
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
}

function populateGrid(){
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            grid[i][j] = new Cell()
            if(Math.random() < 0.5){
                grid[i][j].birth()
            }
        }
    }
}

function findNeighbours(){
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            if(grid[i-1][j-1].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i][j-1].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i+1][j-1].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i-1][j].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i+1][j].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i-1][j+1].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i][j+1].alive){
                grid[i][j].neighboursSum++
            }else if(grid[i+1][j+1].alive){
                grid[i][j].neighboursSum++
            }
        }
    }
}

function nextGeneration(){
    let nextGenGrid = grid
    findNeighbours()
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            if(grid[i][j].neighboursSum < 2 || grid[i][j].neighboursSum > 3){
                nextGenGrid[i][j].kill()
            }else{
                nextGenGrid[i][j].birth()
            }
            let x:number = i*res
            let y:number = j*res
            if(nextGenGrid[i][j].alive){
                ctx.fillRect(x, y, res-1, res-1)
            }else{
                ctx.clearRect(x, y, res-1, res-1)
            }
        }
    }
}






create2DArray(50)
populateGrid()
render()
setInterval(nextGeneration, 1000)


