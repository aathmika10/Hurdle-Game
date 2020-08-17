var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var runners, runner1, runner2, runner3, runner4, runner5;
var runner1img, runner2img, runner3img, runner4img;
var hurdlesgroundimg;
var hurdleimg;
//var Hurdles,hurdle1, hurdle2, hurdle3, hurdle4
var hurdle1

function preload(){
  runner1img=loadImage("runner1.png");
  runner2img=loadImage("runner2.png");
  runner3img=loadImage("runner3.png");
  runner4img=loadImage("runner4.png");
  hurdlesgroundimg=loadImage("hurdles ground.jpg");
  hurdleimg=loadImage("hurdle.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-20);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
