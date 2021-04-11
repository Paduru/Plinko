var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var PLAY = 1;
var END = 0;

var gameState;

var particles = [];
var plinkos = [];
var divisions = [];
var division_scores = [];

var divisionHeight = 300;
var score = 0;
var particle;
var count = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  gameState = PLAY;

  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var y = 0; y < 10; y++) {
    division_scores.push(100 * Math.ceil(random(1, 10)));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  fill("white");
  textSize(35);
  text("Score : " + score, 20, 30);
  for (var z = 0; z < 800; z += 80) {
    textSize(30);
    let s = z / 80;
    text(division_scores[s], z, 500);
  }
  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particle != null && gameState === PLAY) {
    particle.display();

    if (particle.body.position.y > 760) {
      for (var d = 0; d < 10; d++) {
        if (
          particle.body.position.x > divisions[d].body.position.x &&
          particle.body.position.x <= divisions[d + 1].body.position.x
        ) {
          score += division_scores[d];
        }
      }
      particle = null;
      count += 1;
    }
  }

  if (count >= 5) {
    gameState = END;
    fill("red");
    textSize(100);
    text("GAME OVER", 100, 200);
  }
}

function mousePressed() {
  if (gameState !== END) {
    particle = new Particle(mouseX, 10, 10, 10);
  }
}
