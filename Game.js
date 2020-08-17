class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(100,200);
      runner1.addImage(runner1img);
      runner1.scale=0.4
      runner2 = createSprite(100,200);
      runner2.addImage(runner2img);
      runner3 = createSprite(100,200);
      runner3.addImage(runner3img);
      runner3.scale=0.6
      runner4 = createSprite(100,200);
      runner4.addImage(runner4img);
      runner4.scale=0.5
      runners = [runner1, runner2, runner3, runner4];
       
    
    }
  
    play(){
      form.hide();
      Player.getPlayerInfo();
      player.getRunnersAtEnd();
      
    

      if(allPlayers !== undefined){
      image(hurdlesgroundimg,-displayWidth*1,350,displayWidth*5,displayHeight);
      /*for (var a = 100; a < displayWidth*5; a=a+500){
      var hurdle1=createSprite(a, 700, 20, 20)
      }
      for (var b = 100; b < displayWidth*5; b=b+500){
      var hurdle2= createSprite(b, 800, 20, 20)
      }
      for (var c = 100; c < displayWidth*5; c=c+500){
        var  hurdle3=createSprite(c, 900, 20, 20)
      }
      for (var d= 100; d < displayWidth*5; d=d+500){
       var hurdle4=createSprite(d, 1000, 20, 20)
      }
      Hurdles = [hurdle1, hurdle2, hurdle3, hurdle4];
       Hurdles.addImage(hurdleimg)*/
      
      //index of the array
      var index = 0;
      //x and y position of the runners
      var y = 700;
      var x =100;
      for(var plr in allPlayers){
      //add 1 to the index for every loop
       index = index + 1 ;
      y=y+ 50
      //use data form the database to display the runners in y direction
       x = displayWidth - allPlayers[plr].distance;
      runners[index-1].x = x;
      runners[index-1].y = y;

      if (index === player.index){
      /*stroke(10);
      fill("red");
      ellipse(x,y,60,60);*/
      runners[index - 1].shapeColor = "red";
      camera.position.x = runners[index-1].x
      camera.position.y = displayHeight;
      }
    }
 }
  
  if(keyIsDown(RIGHT_ARROW) && player.index !== null){
     player.distance -=50
     player.update();
  }
 /* if(keyDown(UP_ARROW)&& player.index!==null){
     player.distance +=20
     player.update();
     player.velocityY = player.velocityY + 0.8;
  }*/
  if(player.distance>displayWidth*5){
     gameState=2;
     player.rank+=1;
     Player.updaterunnersAtEnd(player.rank);
     textSize(30);
     text("Your Rank: "+player.rank,displayWidth/2-40, displayHeight/2);
     //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
   }
  drawSprites();
  }
  end(){
     console.log("gameEnded");
     console.log(player.rank);
   }
}
  