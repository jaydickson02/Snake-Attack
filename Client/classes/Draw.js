
class Draw{
    
    constructor(numCellsX, numCellsY, cellSize = 10){
        this.cellSize = cellSize //px size of each grid cell, x and y direction
        this.numCellsX = numCellsX;
        this.numCellsY = numCellsY;
    }

    drawFrame(){
        fill(255)
        stroke(0)

        for(let i = 0; i < this.numCellsX; i++){
            for(let n = 0; n < this.numCellsY; n++){
                rect(i * this.cellSize, n * this.cellSize, this.cellSize, this.cellSize)
            }
        }
    }

    drawObject(object, colour = 0){
        fill(colour)
        stroke(255)

        if(object.length){
            for(let i = 0; i < object.length; i++){
                rect(object[i]["x"] * this.cellSize, object[i]["y"] * this.cellSize, this.cellSize, this.cellSize)
            }
        } else {
            rect(object["x"] * this.cellSize, object["y"] * this.cellSize, this.cellSize, this.cellSize)
        }
    }
}