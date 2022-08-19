let nave;
let timer1;
let timer2;
let timer3
let Gasteroides;
let Gtiros;
let bg;
let imgNave;
let imgFundo;
let img
let offsetnave = 400;

const lAsteroides = {
  0: "Ast1.png",
  1: "/arte/asteroides/ast02.png",
};


function setup(){
  
frameRate(30)
  createCanvas(400, 400);
text ("teste"")
  
 timer1 = 0
  timer2 = 0 
  
  Gasteroides = new Group()
  Gtiros = new Group()
  
  
  
  /*

  cria asteroides com caracteristicas especificas
  unir isso no codigo do asteroide, isso é o dna

*/
  

  img = loadImage("bg.png");
  bg = new Sprite(100, 100, 10, 'none');
  bg.addAni(img);
 
 timer3 = new Timer (500, true);
  camera.zoom = 0.7;

img = loadImage("4.png"); //NAVE
  nave = new Sprite(200 , offsetnave, 70);
  nave.addAni(img);
  nave.rotationLock  = true
  nave.mass = 10000

}

function dispAsteroide(posX,forca){
    
    let asteroide = new Sprite(posX, -70, 20);

    img = loadImage(lAsteroides[floor(random(0, 2))]);

    asteroide.addAni(img);
  
    asteroide.vel.y = forca
  asteroide.bounciness = 1;
    asteroide.life = 70
    asteroide.rotationSpeed = 3
  Gasteroides.add(asteroide);
    
  
}

function dispTiro(posX, d, mass,y, x,  life, dir = 0){
  //console.log ("peritonio")
  let img = loadImage('tiro1.png')
  
  
  tiro = new Sprite (posX,offsetnave)
  
  tiro.addAni(img)
  
  tiro.d = d
  tiro.mass = mass
  tiro.vel.y = y
  tiro.vel.x = x
  if (dir){
    tiro.rotation = dir + 90
    tiro.direction = dir
    
  }
  tiro.life = life
  tiro.rotationLock  = true
  Gtiros.add (tiro)
}


function dispTiroPadrao (tipo){
  //1 == padrao
  //2 == spread
  
  //666== caga minas

  
  
  
   if (tipo == 2)
    
    {
      for ( i = -30; i < 40; i = i + 10){
           dispTiro (nave.x, 40, 60, -10, 0, 8, i)     
            
      }
     
    }
   if (tipo == 4)
    
    {
      for ( i = -3; i < 3; i ++){
           dispTiro (nave.x, 30, 60, -35, i, 8)     
        
      }
     
    }
  
  
  if (tipo == 3)
    
    {
      for ( i = -2; i < 3; i ++){
           dispTiro (nave.x, 60, 100, -35, 0, 8)     
        
      }
     
    }
    if (tipo == 1){
      
      dispTiro (nave.x, 60, 100, -35, 0, 8)
      
    }
}

//duração do tiro
//tamanho do tiro
//velocidade de disparo
// frequencia de disparo
// quantidade por voleio


function draw() {
  text ('teste')
  
  
  
  //clear();
  noStroke()
camera.on ()
  
  if (timer3.expired()) {
    
    dispTiroPadrao (2)
    
  //  console.log ("expirou");
    timer3.start()
    
    
  }
  
  let magnitude = 100
  let offset = width/2 * timer2/20
  let intervalo1 = 8
  let intervalo2 = 50
  
  timer1++
  
  if (timer1 == intervalo1){
    dispAsteroide((cos(timer2) * magnitude) + offset , 10 );  
    timer1= 0 ;
    timer2++;
    if (timer2 == intervalo2){
      timer2 = 0;
      
    }
  }
   
    nave.moveTowards (mouse.x, nave.y );
    
 }
