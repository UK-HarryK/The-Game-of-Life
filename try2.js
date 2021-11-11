"use strict"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const res = 10
class Cell{
    alive
    neighboursSum
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
    resetNeighbours(){
        this.neighboursSum = 0
    }
}
function create2DArray(length){
    let array = new Array(length)
    for(let i=0; i<array.length; i++){
        array[i] = new Array(length)
        for(let j=0; j<array[i].length; j++){
            array[i][j] = new Cell()
        }
    }
    return array
}
function randomlyBirthCells(array){
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length; j++){
            if(Math.random() < 0.5){
                array[i][j].birth()
            }
        }
    }
}
function render(array){
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length; j++){
            if(array[i][j].alive){
                let x = i*res
                let y = i*res
                ctx.fillRect(x, y, res-1, res-1)
            }
        }
    }
}
function findNeighbours(array){
    for(let i=1; i<array.length-1; i++){
        for(let j=1; j<array[i].length; j++){
            let centerCell = array[i][j]
            if(centerCell.neighboursSum !== 0){
                alert(`Something is wrong. Value of neighbours sum = ${centerCell.neighboursSum}`)
            }else{
                if(array[i-1][j-1].alive){
                    centerCell.neighboursSum++
                }
                if(array[i][j-1].alive){
                    centerCell.neighboursSum++
                }
                if(array[i+1][j-1].alive){
                    centerCell.neighboursSum++
                }
                if(array[i-1][j].alive){
                    centerCell.neighboursSum++
                }
                if(array[i+1][j].alive){
                    centerCell.neighboursSum++
                }
                if(array[i-1][j+1].alive){
                    centerCell.neighboursSum++
                }
                if(array[i][j+1].alive){
                    centerCell.neighboursSum++
                }
                if(array[i+1][j+1].alive){
                    centerCell.neighboursSum++
                }
            }
        }
    }
}
function nextGeneration(oldGrid){
    let nextGenGrid = create2DArray(oldGrid.length)
    findNeighbours(oldGrid)
    for(let i=0; i<nextGenGrid.length; i++){
        for(let j=0; j<nextGenGrid[i].length; j++){
            if(oldGrid[i][j].neighboursSum == 2 || oldGrid[i][j].neighboursSum == 3){
                nextGenGrid[i][j].birth()
            }
            else{
                nextGenGrid[i][j].kill()
            }
            oldGrid[i][j].resetNeighbours()
        }
    }
    render(nextGenGrid)
    return nextGenGrid
}

let grid = create2DArray(20)
randomlyBirthCells(grid)
render(grid)
setInterval(()=> grid = nextGeneration(grid), 1000)