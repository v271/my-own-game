var gameOver, gameOverImg;

function preload(){
  playerimg = loadImage("Images/player.png");
  screenImg = loadImage("Images/background.png");
  arrowImg = loadImage("Images/arrow.png");
  enemyImg = loadAnimation("enemy1.png","enemy2.png","enemy3.png","enemy4.png","enemy5.png","enemy6.png","enemy7.png","enemy8.png","enemy9.png","enemy10.png","enemy11.png","enemy12.png")
  gameOverImg = loadImage("Images/gameOver.png");
}

function setup() {
  createCanvas(2000,750);

  screen = createSprite(700,380);
  screen.addImage(screenImg);
  screen.scale = 1.15;

  player = createSprite(249,551,50,5);
  player.addImage(playerimg);
  player.scale = 0.5;
  
  arrowGroup = createGroup(); 
  enemiesGroup = createGroup();

  //place gameOver icon on the screen
  gameOver = createSprite(687,297);
  gameOver.visible = false;
  gameOver.addImage("gameOver",gameOverImg);

  gamestate = "start";
}


function draw() {
  background(0);  
  if(gamestate === "start"){

    if (mouseWentDown(LEFT)){
      createArrow();  
    }
    if(frameCount%80 === 0){
      enemies();
    }
    for(var i=0;i<enemiesGroup.maxDepth();i++){
      var getenemy=enemiesGroup.get(i);
      if(getenemy && arrowGroup.isTouching(getenemy) ){
      // score=score+1;
        getenemy.destroy();
        arrowGroup.destroyEach();
      }
    }

    if(enemiesGroup.isTouching(player)){
      gamestate = "end";
    }

  }else if (gamestate === "end"){
    gameOver.visible = true
  
    enemiesGroup.setVelocityXEach(0);
    arrowGroup.setVelocityXEach(0);

    enemiesGroup.setLifetimeEach(-1);
    arrowGroup.setLifetimeEach(-1);
  }

  drawSprites();
  textSize(30);
  fill("white");
  text(mouseX + "," + mouseY, 30,30);

}
function enemies(){
  var enemy = createSprite(random(800,1400),576,10,10)
  enemy.addAnimation("running",enemyImg);
  
  enemy.scale = 0.5;
  //enemy.velocityY = -3;
  enemy.velocityX = -3;
  enemy.lifetime = 350;
  enemiesGroup.add(enemy);

}
function createArrow(){
  arrow = createSprite(245, 366, 10, 10);
  arrow.y = player.y;
  arrow.addImage(arrowImg);
  arrow.scale = 0.1;
  arrow.velocityX = 50;
  arrow.lifetime = 100;
  arrow.setCollider("rectangle", 0, 0, 60, 1);
  arrowGroup.add(arrow);
}