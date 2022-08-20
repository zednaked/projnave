let snave;

let sfundo;

let stiro;
let imgtiro

let timer1

function preload() {
  
  img = loadImage ("/arte/bg.png")
  sfundo = new Sprite();
  sfundo.addAni (img)
  sfundo.overlap(allSprites)

  img = loadImage("/arte/nave.png");
  snave = new Sprite();
  snave.addAni(img)

  imgtiro = loadImage ("/arte/tiro1.png")
  
}

function atira ()

{
  
  
}

function setup() {
  
  createCanvas(400, 400);
  camera.zoom = 0.7;
  
  timer = new Timer (300,true)
  
  snave.x = width / 2
  snave.y = 400;
  
  sfundo.x = width/2
  sfundo.y = height /2
  
}
function draw() {
  camera.on();
  
  snave.x += cos(frameCount * 10)/5
  
  
      
  
  snave.moveTowards (mouse.x, snave.y)
   
}