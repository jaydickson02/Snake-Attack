class Snake{

    constructor(size = 1, x, y){
        this.size = size;
        this.x = x;
        this.y = y;

        this.xVel = 0;
        this.yVel = 0;
        
        this.cells = [] //Each segement of the snakes body

        this.initialise() //initialise the array by generating the snake cells
    }

    initialise(){
        //write boundary checker

        for(let i = 0; i < this.size; i++){
            this.cells.push({'x': this.x - i, 'y': this.y})
        }
        
    }

    get segments(){
        return this.cells
    }

    addSegments(newSegments){
        this.size += newSegments;

        indexOfLastSegment = this.cells.length - 1;

        lastSegmentX = this.cells[indexOfLastSegment].x;
        lastSegmentY = this.cells[indexOfLastSegment].y;

        for(let i = 0; i < newSegments; i++){
            this.cells.push({'x': lastSegmentX + 1, 'y': lastSegmentY}); //Fix so segment is added in the direction of movement
        };
        
    }

    move(direction){

        if(direction){
            switch(direction){
                case 'up':
                    this.xVel = 0
                    this.yVel = -1
                break;
    
                case 'down':
                    this.xVel = 0
                    this.yVel = 1
                break;
    
                case 'left':
                    this.xVel = -1
                    this.yVel = 0
                break;
    
                case 'right':
                    this.xVel = 1
                    this.yVel = 0
                break;
            }
        }
        
        if(!(this.xVel == 0 && this.yVel == 0)){

            let firstCell = this.cells[0]

            this.cells.pop()
            this.cells.unshift({'x': firstCell['x'] + this.xVel, 'y': firstCell['y'] + this.yVel})
        }
    }
}


