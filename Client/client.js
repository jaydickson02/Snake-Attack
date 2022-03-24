let primeSnake;
let grid = new Draw(10, 10, 30)

function setup() {
    createCanvas(1000, 650)
    frameRate(2)

    primeSnake = new Snake(5, 7, 5)
}

function draw() {

    background(255)
    grid.drawFrame()
    grid.drawObject(primeSnake.segments)
    primeSnake.move()
    
}

function keyPressed(){
    
        if (keyCode === LEFT_ARROW) {
          primeSnake.move('left')

        } else if (keyCode === RIGHT_ARROW) {
            primeSnake.move('right')

        } else if (keyCode === DOWN_ARROW) {
            primeSnake.move('down')

        } else if (keyCode === UP_ARROW) {
            primeSnake.move('up')
        }
}