let snave;


let sfundo;

function preload() {
  
  img = loadImage ("/arte/bg.png")
  sfundo = new Sprite();
  sfundo.addAni (img)
  sfundo.overlap(allSprites)

  img = loadImage("/arte/nave.png");
  snave = new Sprite();
  snave.addAni(img)
}

function setup() {
  
  createCanvas(400, 400);
  camera.zoom = 0.7;
  snave.x = width / 2;
  snave.y = 200;
  sfundo.x = width/2
  sfundo.y = height /2
  
}
function draw() {
  camera.on();
}