const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let engine;
let world;
var ground;
var jointPoint;
var jointLink;
var zombie1, sadzombie;
var breakButton;
var backgroundImage;
var colmeia;
var collided = false;
function preload() {
  zombie1 = loadImage("humano.png");
  sadzombie = loadImage("humano_triste.png");
  backgroundImage = loadImage("download2.png");
  ground = loadImage("download1.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(0, height - 10, width * 2, 20);
  colmeia = createSprite(width/1, height - 200, 20, 20);
  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var colmeia = new Colmeia(x, y, 80, 80);
    colmeia.push(colmeia);
  }
  zombie = createSprite(width / 2, height - 100, 50, 50);
  zombie.addImage("oi", zombie1)
  zombie.addImage("sad", sadzombie);
  zombie.scale = 0.1;
  zombie.velocityX = 10;
  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}
function draw() {
  background(backgroundImage);
  Engine.update(engine);
  for (var colmeia of Colmeia) {
    colmeia.show();
    var pos = colmeia.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      collided = true;
    }
  }
  drawSprites();
}
function handleButtonPress() {
  setTimeout(() => {
    colmeia.velocityY = +20;
  }, 1500);
}