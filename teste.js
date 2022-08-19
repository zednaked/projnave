let snave;

function preload() {
  let img = loadImage("/arte/nave.png");
  snave = new Sprite();
  snave.addAni(img);
}

function setup() {
  snave.x = width / 2;
  snave.y = height / 2;
  createCanvas(400, 400);
  camera.zoom = 0.7;
}
function draw() {
  camera.on();
}