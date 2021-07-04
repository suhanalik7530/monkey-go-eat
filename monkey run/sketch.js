var monkey, monkey_0;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var score_0;
var tree;
var ground;
function preload() {
  
  monkey_0 = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  treeImage = loadImage("tree.png")
}

function setup() {
  createCanvas(600, 250);
  Monkey = createSprite(60, 170, 30, 30);
  Monkey.addAnimation("monkey", monkey_0);
  Monkey.scale = 0.2;

  ground = createSprite(200, 240, 900, 10);
  ground.velocityX = -6;
  console.log(ground.x);

  
  
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  treeGroup=createGroup();
  Monkey.setCollider("aabb", 0, 30, 200, 520);
  Monkey.debug = false;
  score = 0;
  score_0 = 0;
}

function draw() {
  background("forest");
  stroke("white");
  fill("orange");
  textSize(20);
  text("survival Time :" + score, 420, 20);
  fill("red");
  score = Math.ceil(frameCount/frameRate())
  text("bananas Collected :" + score_0, 20, 20);
  
  
  
   if (ground.x < 0) {
   ground.x = ground.width / 2
      } 

  if (keyDown("space") && Monkey.y >= 100) {
    Monkey.velocityY = -12;
  }
  Monkey.velocityY = Monkey.velocityY + 0.8;
  
  
  if(bananaGroup.isTouching(Monkey)){
    bananaGroup.destroyEach();
    score_0 = score_0+1;
  }
  
    
  

  Monkey.collide(ground);
  


  spawnObstacle();
  spawnBanana();
  
  if(bananaGroup.isTouching(Monkey)){
    bananaGroup.destroyEach();
    score_0 = score_0+1;
  }
  
  if (obstacleGroup.isTouching(Monkey)) { 
    Monkey.velocityX = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0)
    score = 0
    score_0 = 0
  
    
  
  }
  drawSprites();
}

function spawnObstacle() { 
  if (frameCount % 100 === 0) {
    obstacle = createSprite(300, 200, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.y = Math.round(random(150 ,200 ))
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(-1);
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(200, 150, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(120, 200));
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(-1);
  }
}
function reset(){
  ground.velocityX = 0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
}