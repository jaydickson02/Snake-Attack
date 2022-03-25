//let primeSnake;
let grid = new Draw(10, 10, 30)
let players = {};
let sessionID;

const socket = io({
    transports: ["websocket"]
  });


function setup() {
    createCanvas(1000, 650)
    frameRate(1)
    
}

function draw() {

    //Client Only
    background(255)
    grid.drawFrame()

    

    //Server Related

    socket.on("id", (data) =>{
        sessionID = data;
    })

    if(!sessionID){
        socket.emit('connected', 'Connected! Send ID')
    }

    if(sessionID){
        socket.on("players", (data) => {
            //get the data from the server to continually update the positions

            for(const item in data){
            let found = false;

                for(const player in players){

                    if(item == player){
                        players[player].size = data[item].size;
                        players[player].x = data[item].x;
                        players[player].y = data[item].y;
                
                        players[player].xVel = data[item].xVel;
                        players[player].yVel = data[item].yVel;
                        
                        players[player].cells = data[item].cells;

                        found = true;
                    }
                }

                if(found == false){
                    let newPlayer = new Player(
                        data[item].x, 
                        data[item].y, 
                        data[item].size, 
                        data[item].cells, 
                        data[item].xVel, 
                        data[item].yVel
                    )

                    players[item] = newPlayer
                }
            }
        });

    

     // console.log(players)
    
        if(players){
            for(const id in players){
                grid.drawObject(players[id].segments)
                players[id].move()
                
                if(sessionID && players[sessionID]){
                    //players[sessionID].move()

                    //console.log(players[sessionID].cells)

                    let updatePacket = {
                        'x': players[sessionID].x,
                        'y': players[sessionID].y,
                        'size': players[sessionID].size,
                        'cells': players[sessionID].cells,
                        'xVel': players[sessionID].xVel,
                        'yVel': players[sessionID].yVel
                    }

                    socket.emit("updateObject", updatePacket);
                }
            }
            for(player in players){
                console.log(players[player]['cells'])
            }
        }
    }
}

function keyPressed(){
    if(sessionID && players[sessionID]){
        if (keyCode === LEFT_ARROW) {
            players[sessionID].move('left')
  
          } else if (keyCode === RIGHT_ARROW) {
            players[sessionID].move('right')
  
          } else if (keyCode === DOWN_ARROW) {
            players[sessionID].move('down')
  
          } else if (keyCode === UP_ARROW) {
            players[sessionID].move('up')
          }
    }
        
}