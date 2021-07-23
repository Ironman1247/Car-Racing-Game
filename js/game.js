class Game {
    constructor(){
        
    }

    getState(){
  
        var gameStateref = database.ref("gameState")
        gameStateref.on("value",(data)=>{
            gameState = data.val();
        })
    }

    updateState(state){
        database.ref("/").update({
            gameState : state
        })
    }


    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
            playerCount = playerCountRef.val()
            player.getCount()
            }
            form = new Form()
            form.display();
        }

        car1 = createSprite(100,200,50,50)
        car1.addImage(carI1)
        car2 = createSprite(300,200,50,50)
        car2.addImage(carI2)
        car3 = createSprite(500,200,50,50)
        car3.addImage(carI3)
        car4 = createSprite(700,200,50,50)
        car4.addImage(carI4)
        cars = [car1, car2 , car3 , car4]
        carsFinished = false;
    }

    play(){
        form.hide();
        Player.getPlayerInfo();

        player.getFinishedPlayers();

        if(allPlayers != undefined){
            background("white")
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
            var index =0
            var x = 175
            var y 

            for (var plr in allPlayers){
                index = index+1
                x = x+200
                y = displayHeight - allPlayers[plr].distance
                cars[index-1].x = x
                cars[index-1].y = y

                if(index === player.index){
                    fill("red")
                    ellipse(x,y,60,60)
                    camera.position.x = displayWidth / 2
                    camera.position.y = cars[index-1].y
                }
                textAlign(CENTER);
                textSize(20)
                text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70)
            }

            if(keyDown(UP_ARROW) && player.index != null && carsFinished != true){
                  player.distance = player.distance + 10
                  player.update();
                  console.log(player.distance)
                //  carsFinished = true;
            }
            if(player.distance >  4000 && carsFinished === false){
               Player.updateFinishedPlayers();
               player.rank = finishedPlayers
               player.update()
               carsFinished = true;
            }
        }
        drawSprites();
        
    }

    displayRanks(){
          camera.position.x = 0
          camera.position.y = 0
          Player.getPlayerInfo();
          textAlign(CENTER)
          fill(0)
          textSize(50)
          for(var plr in allPlayers){
              if(allPlayers[plr].rank === 1){
                  text("1 Rank "+allPlayers[plr].name,0,80)
              }
              else if (allPlayers[plr].rank === 2){
                  text("2 Rank "+allPlayers[plr].name,0,150)
              }

              else if(allPlayers[plr].rank === 3){
                  text("3 Rank "+allPlayers[plr].name,0,220)

             
              }

              else{
                  text("You Lost"+allPlayers[plr].name,0,290)
              }
          }
    }
}