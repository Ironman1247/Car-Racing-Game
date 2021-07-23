class Form {
  constructor(){
      this.title = createElement('h1')
      this.button =  createButton("Play")
      this.input = createInput("Name")
      this.reset = createButton("Reset")
      this.greeting = createElement("h2")
  }

  hide(){
      this.title.hide();
      this.button.hide();
      this.input.hide();
      this.greeting.hide();
  }

  display(){
      this.title.html("Car Racing Game")
      this.title.position(displayWidth/2 -100,50)
      this.input.position(displayWidth/2 -50,displayHeight/2 -50)
      this.button.position(displayWidth/2 ,displayHeight/2 + 50)
      this.button.mousePressed(()=>{
       this.input.hide();
       this.button.hide();
       player.name =this.input.value();
       playerCount = playerCount + 1
       player.index = playerCount
       player.update();
       player.updateCount(playerCount)
       this.greeting.html("Welcome "+ player.name)   
       this.greeting.position(displayWidth/2, displayHeight/2)
      })
      this.reset.mousePressed(()=>{
          player.updateCount(0)
          game.updateState(0)
          database.ref("/").update({
              players : null, 
              carsAtEnd : 0
          })
      })
  }
}