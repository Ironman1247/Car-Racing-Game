 var database , car1 , car2 , car3 , car4 , cars 
 var gameState = 0
 var playerCount
 var distance = 0
 var allPlayers
 var form , player , game 
 var carsFinished
 var finishedPlayers = 0
 var bgImage
 var carI1 , carI2 , carI3 , carI4
 var track , track2

 function preload(){
   bgImage=loadImage("startbg.png")
   carI1=loadImage("car1.png")
   carI2=loadImage("car2.png")
   carI3=loadImage("car3.png")
   carI4=loadImage("car4.png")
   track=loadImage("track.jpg")
   track2=loadImage("track.png")
 }

function setup(){
    createCanvas(displayWidth,displayHeight);
    database = firebase.database();

    game = new Game()
    game.getState();
    game.start();
    
}

function draw(){
    background("white");
    if(playerCount === 4 && finishedPlayers === 0){
        game.updateState(1)
    }

    if(gameState === 1){
       game.play();
    }
  
     if(finishedPlayers === 4 ){
         game.updateState(2);
     }


    if(gameState === 2 && finishedPlayers === 4){
        game.displayRanks();
    }
}

 