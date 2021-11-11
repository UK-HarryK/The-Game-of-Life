"use strict"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

class Cell{
    alive
    numNeighbours
    constructor(){
        this.alive = false
        this.numNeighbours = 0
    }
    die(){
        this.alive = false
    }
    birth(){
        this.alive = true
    }
    resetNeigbours(){
        this.numNeighbours = 0 
    }
}

class Grid{
    array2D
    length
    resolution
    constructor(length){
        this.length = length
        this.array2D = new Array(length)
        this.resolution = 10
    }
    construct2DArray(){
        for(let i=0; i<this.array2D.length; i++){
            this.array2D[i] = new Array(this.length)
        }
    }
    populateRandomly(){
        for(let i of this.array2D){
            for(let j of i){
                j = new Cell()
                if(Math.random() < 0.5){
                    j.birth()
                }
            }
        }
    }
}

function render(gridObject){
    for(let i=0; i<gridObject.length; i++){
        let h = gridObject[i]
        for(let j=0; j<h.length; j++){
            let g = h[j]
            if(g.alive){
                let x = i*gridObject.resolution
                let y = i*gridObject.resolution
                ctx.fillRect(x, y, (gridObject.resolution - 1), (gridObject.resolution - 1))
            }
        }
    }
}


let grid = new Grid(5)
grid.construct2DArray()
grid.populateRandomly()
render(grid)
console.table(grid.array2D)