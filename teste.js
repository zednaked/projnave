p5.disableFriendlyErrors = true;
let world;
let snave;
let sfundo;

let imguivida;
let imguidindin;

let svida;
let sdindin;

let imgfundodir;
let imgfundoesq;

let sfundodir;
let sfundoesq;

//let imgfundo;
let imgast;
let imgnave;
let imgtitle;
let imgpressstart;

let loop = true;

//propriedades do tiro

let veltiro = 800;
let voleio = 3;
let vidatiro = 30;

//temporizadores

let timerlevelup;
let timerdindin;
let timerfundo;
let timertiro;
let timerast;
let timerpressstart;
let timerlevelup2;
let timewarp = false;
let timertimewarp;
let tempotimewarp = 800;

let tscreen = 0;
let jogando = 0;

let imgtiro;
let gast;
let gtiro;
let gdindin;

let veljogo = 1.5;

/*
  n1 = 0 - abertura  >> fazezr
    chama n1=1, n2=0
  n1 = 1 - tela inicial
  
  n1 = 1 , n2 =0 - inicializa sprites
  n1 = 1 , n2 =1 - highscore
  n1 = 1 , n2 =2 - destroi telainicial
  
  n1 = 2 - jogo 
  
  n1 = 2 , n2 =0 - inicializa sprites e afins
  
  n1 = 2 , n2 =1 - loop principal
  n1 = 2 , n2 =1 - game over - destroi jogo e devolve para n1=1, n2=0
  n1 = 2, n2 = 2 - pause 

*/
let n1 = 1;
let n2 = 0;

let pausa = false;

let level = 1;
let nlevel = 5;
let score = 0;
let dindin = 0;
let gameover = 0;

let stars = [];

/// ISSO ELE FAZ ANTES DO SETUP

function preload() {
  imgexplo1 = loadAnimation(
    "/arte/explo1.png",
    { size: [145, 149], frames: 4 }
  );

  imguivida = loadImage(
    "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/vida.png?v=1661170916529"
  );
  imguidindin = loadImage(
    "/arte/dindin.png"
  );
  imgfundodir = loadImage(
    "/arte/bgdireita.png"
  );
  imgfundoesq = loadImage(
    "/arte/bgesquerda.png"
  );

  imgfundoesq2 = loadImage(
    "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/fundoesq2.png?v=1661217863087"
  );

  imgnave = loadImage(
    "/arte/nave.png"
  );
  // imgfundo = loadImage(
  //   "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/fundo.png?v=1661123349545"
  //);

  imgast = loadImage(
    "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/Ast01.png?v=1661123384325"
  );

  imgtiro = loadImage(
    "/arte/tiro.png"
  );

  imgtitle = loadImage(
    "/arte/title.png"
  );

  imgpressstart = loadImage(
    "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/pressstart.png?v=1661375122060"
  );

  imglevelup = loadImage(
    "https://cdn.glitch.global/2dd145c2-5538-4020-93ce-5263a37dbbaa/lvlup.png?v=1661639930991"
  );

  imgcarta = loadImage(
    "/arte/carta1.png"
  );
}

//ISSO ELE FAZ APENAS UMA VEZ QDO VC ENTRA NO JOGO

function setup() {
  //INICIA A CANVAS
  createCanvas(400, 700);

  //INICIA TANBULEIRO DE HISCORE
  tbscore = loadJSON("score.json");

  //INICIALIZA TEMPORIZADORES
  timertimewarp = new Timer(tempotimewarp, true);
  timerlevelup = new Timer(1000, true);
  timerlevelup2 = new Timer(5000, false);
  timerdindin = new Timer(100, true);
  timertiro = new Timer(veltiro, true);
  timerast = new Timer(100, true);

  timerfundo = new Timer(800, true);

  //INICIA GRUPOS
  gcartas = new Group();
  gast = new Group();
  gdindin = new Group();
  gtiro = new Group();
  gexplosao = new Group();

  //PREPARA O GRUPO CARTAS
  gcartas.scale = 2;
  gcartas.w = 80;
  gcartas.h = 150;
  gcartas.addImage(imgcarta);
  gcartas.layer = 0;
  //gcartas.life = 300;

  //MISC
  noStroke();
  camera.zoom = 0.7;

  imgexplo1.frameDelay = 2;
  imgexplo1.rotation = 93;

  geraEstrelas();
}

/// ZERA TUDO E PREPARA PARA UM NOVO JOGO

function inijogo() {
  //EM TESE ISSO É PRA ZERAR TUDO NOS GRUPOS
  gast = new Group();
  gtiro = new Group();
  gdindin = new Group();

  //ISSO CRIA A NAVE
  snave = new Sprite();
  snave.addAni(imgnave);
  snave.d = 30;
  snave.rotationLock = true;
  snave.overlap(gast, tomaDano);

  //GERENCIA COLISOES !
  //CARTAS
  gcartas.overlap(gast, nada);
  gcartas.overlap(gdindin, nada);
  gcartas.overlap(gtiro, nada);
  gcartas.overlap(gexplosao, nada);
  //TIROS
  gtiro.collide(gast, acerta);
  gtiro.overlap(snave, nada);
  gtiro.overlap(gdindin, nada);
  //XP
  gdindin.collide(gdindin, nada);
  gdindin.collide(gast, nada);
  gdindin.overlap(snave, pegaDindin);

  gast.overlap(gdindin, nada);

  //MISC

  imguidindin.resize(35, 35);

  score = 0;
  level = 1;
  dindin = 0;
  nlevel = 2;
  n2 = 1;
}

// LOOP JOGO ---------
function jogo() {
  //FAZ A NAVE FICAR MOVIMENTANDINHO
  snave.x = snave.x + cos(frame * 10) * 0.5;
  snave.y = height + height * 0.1 + sin(frame * 25) * 0.3;

  //DISPARA ASTEROIDES
  if (timerast.expired()) {
    asteroideia();
    timerast.setTimer(1000 - level * 50); //AQUI CALCULA A VELOCIDADE QUE OS ASTEROIDES CAEM

    timerast.start();
  }
  //DISPARA TIROS
  if (timertiro.expired()) {
    for (i = 0; i < voleio; i++) {
      atira();
    }

    timertiro.setTimer(veltiro);
    timertiro.start();
  }
  //MOVIMENTA A NAVE
  if (!pausa) {
    snave.moveTowards(mouse.x, snave.y);
  }

  //MISC
  fill(133, 133, 155);
  textSize(40);

  text("LEVEL " + level + "\n  Score:\n      " + score, 120, -87);
}

//GAME OVER !!!!
function jogoDestroy() {
  allSprites.remove();
  n1 = 1;
  n2 = 0;
}
//TELA INICIAL DO JOGO
function initelainicio() {
  imgtitle.resize(650, 900);
  imgpressstart.resize(300, 30);

  stitle = new Sprite();
  stitle.addImage(imgtitle);
  stitle.overlap(allSprites);

  spressstart = new Sprite();
  spressstart.addImage(imgpressstart);
  spressstart.overlap(allSprites);

  timerpressstart = new Timer(1000, true);
  n2 = 1;
}
//LOOP TELA DE INICIO
function telainicio() {
  if (mouse.pressed()) {
    n2 = 2;
    return 0;
  }

  if (timerpressstart.expired()) {
    if (spressstart.visible) {
      spressstart.visible = false;
    } else {
      spressstart.visible = true;
    }

    timerpressstart.start();
  }
}

// DESTROI A TELA INICIO E PASSA A CENA
function telainicioDestroy() {
  stitle.remove();
  spressstart.remove();
  n1 = 2;
  n2 = 0;
}

//MUDA A CENA AO TOMAR DANO
function tomaDano() {
  n2 = 2;

  return;
}

//GERA FUNDO DE ESTRELAS (USADO APENAS UMA VEZ)
function geraEstrelas() {
  for (i = 0; i < 500; i++) {
    let star = {
      x: random(-100, width + 100),
      y: random(-200, height + 200),
    };

    stars.push(star);
  }
}

//FAZ UM MOVIMENTO COM AS ESTRELAS
function updateEstrelas() {
  for (i = 0; i < 500; i++) {
    let x = stars[i].x;
    let y = stars[i].y;

    fill(255, 255, 255, 30);

    ellipse(x, y + cos(frameCount * 0.5) * 100, random(3, 3), random(0, 10));
  }
}

// GERA UMA EXPLOSÃO
function explode(xx, yy) {
  let explo = new Sprite(xx, yy, 145);
  explo.scale = random(0.4, 0.8);
  explo.addAni(imgexplo1);
  explo.life = 7;
  explo.overlap(allSprites);
  gexplosao.add(explo);
}

//FUNÇÃO QUE DISPARA TIROS
function atira() {
  let tiro = new Sprite();
  tiro.addAni(imgtiro);
  tiro.d = 10;
  tiro.density = 1000;
  tiro.bounciness = 0;
  tiro.x = snave.x + cos(frame * 100) * 10;
  tiro.y = snave.y - 10 + random(20, 40);
  //tiro.rotation =
  tiro.vel.y = -10;
  tiro.direction = random(-93, -87);

  tiro.rotationLock = true;
  tiro.life = vidatiro;
  gtiro.add(tiro);
}

//FUNÇÃO NULA
function nada() {}

//DISPARA ASTEROIDES
function asteroideia() {
  let asteroide = new Sprite();
  asteroide.rem = false;
  asteroide.dynamic = true;
  asteroide.friction = 100;
  asteroide.x = random(10, width + 10);
  asteroide.y = -150;
  asteroide.d = 30;
  asteroide.mass = 1000;
  asteroide.addAni(imgast);
  asteroide.vel.y = random(8, 10);
  asteroide.vel.x = random(-0.9, 1);
  asteroide.moveTowards(snave.x, snave.y, 0.005);
  // asteroide.life = 2600;
  asteroide.rotationSpeed = random(-5, 5);
  asteroide.scale = random(0.5, 1.5);
  asteroide.update = () => {
    if (asteroide.y > 900) {
      asteroide.remove();
    }
  };
  gast.add(asteroide);
}

//QUANDO ASTEROIDE COLIDE COM TIRO FAZ ISSO

function acerta(tiro, asteroide) {
  //blinka a tela
  background(255);
  //manda um time warp
  timewarp = 1;
  //tiro.life = 0;
  //remove o tiro e asteroide
  tiro.remove();
  asteroide.remove();

  //cria dindi e explosao
  criaDindin(asteroide.x, asteroide.y);
  explode(tiro.x, tiro.y);
}

// QUANDO COLIDE DINDIN COM NAVE FAZ ISSO

function pegaDindin(dindinz, nave) {
  dindinz.remove();
  score += 1;
}

// CRIA DINDIN NUMA POSIÇÃO X Y
//TEM A POSSIBILIDADE DE ATRAIR PRA CIMA DA NAVE
function criaDindin(x, y) {
  dindinzin = new Sprite();
  dindinzin.addImage(imguidindin);
  dindinzin.scale = 0.3;
  dindinzin.mass = 10;
  dindinzin.dynamic = true;
  dindinzin.x = x;
  dindinzin.y = y;
  dindinzin.vel.y = random(4, 6);
  dindinzin.update = () => {
    //if (timerdindin.expired()) { FAZ IR ATRAS DO PLAYER !!!
    // dindinzin.moveTowards(snave.x, snave.y, 0.01);
    /// timerdindin.start();
    // }

    if (dindinzin.y > 900) {
      dindinzin.remove();
    }
  };
  gdindin.add(dindinzin);
}

//GERENCIA O FUNDO
//IMPLEMENTAR OUTROS TIPOS DE FUNDO
function fundo() {
  //QUANDO O TEMPORIZADOR DO FUNDO FINALIZA ELE FAZ ISSO:
  if (timerfundo.expired()) {
    for (i = 0; i < 2; i++) {
      let sfundoesq = new Sprite();

      sfundoesq.addImage(imgfundoesq);
      sfundoesq.scale = random(0.8, 1.2);
      sfundoesq.x = -70 + random(-20, 30);
      sfundoesq.y = -600;
      sfundoesq.overlap(allSprites);
      sfundoesq.vel.y = random(8, 15);
      sfundoesq.update = () => {
        if (sfundoesq.y > 900) {
          sfundoesq.remove();
        }
      };
      //sfundoesq.getImage().scale(70,70)

      let sfundodir = new Sprite();
      sfundodir.addImage(imgfundodir);
      sfundodir.x = width + 90 + random(-35, 70);
      sfundodir.y = -600;

      sfundodir.overlap(allSprites);
      sfundodir.vel.y = random(8, 15);

      sfundodir.update = () => {
        if (sfundodir.y > 900) {
          sfundodir.remove();
        }
      };
    }

    timerfundo.start();
  }
}

//INICIALIZA A TELA DE LEVELUP

function levelupz() {
  pausa = true;
  for (let astero of gast) {
    astero.xvel = astero.vel.x;

    astero.yvel = astero.vel.y;
    astero.vel.x = 0;

    astero.vel.y = 0;
  }
  //ARRUMAR ISSO , TEMPORIZADOR QUE DEIXA O CARA ESCOLHER POR UM TEMPO
  timerlevelup2.start();
  // IMOBILIZA A NAVE
  snave.static = true;
  //TALVEZ ISSO TORNE  pausa=true inutil

  //n2 = 3;

  //DIMINUI A VELOCIDADE DO JOGO
  veljogo = 0.01;
  //MOSTRA AS CARTAS
  for (i = 0; i < 4; i++) {
    let carta = new gcartas.Sprite(200, 300);
    carta.addAni(imgcarta);
    carta.nome = "tiro no pinto";

    carta.update = () => {
      if (carta.mouse.pressed()) {
        //carta.life = 10
        veltiro -= 100;
        carta.vel.y -= 15;
        dlevelup();
      }
    };
  }

  //pausa = true;
  // imglevelup.resize(400, 250);
}

//FECHA A TELA DE LEVELUP
//APLICA AS COISAS
function dlevelup() {
  pausa = false;
  //  slevelup.remove();
  //pausa = false;
  for (let astero of gast) {
    astero.vel.x = astero.xvel;
    astero.vel.y = astero.yvel;
  }
  for (carta of gcartas) {
    carta.life = 15;
    carta.vel.y += 10;
  }
  snave.dynamic = true;
  veljogo = 1.5;
  n2 = 1;
}

//FAZ A VERIFICAÇÃO DE LEVELUP
function doLevelup() {
  if (score > nlevel) {
    level += 1;
    nlevel = nlevel + round(nlevel + 5);
    levelupz();
    n2 = 3;
  }
}

//FUNCAO TIME WARP
function dotimewarp() {
  //EXECUTA TIME WARP

  if (timewarp) {
    //pausa = true
    timewarp = false;
    //vidatiro += 60 /// ASSIM ELE FAZ TIPO UM SISTEMA DE COMBOS QUE VAI AUMENTANDO A VELOCIDADE CONFORME VC ACERTA MAIS
    vidatiro += 20;
    timertimewarp.start();
    veljogo = 0.3;
  }

  if (timertimewarp.expired()) {
    if (!pausa) {
      //pausa= false
      vidatiro = 30;
      veljogo = 1.5;
      timertimewarp.setTimer = tempotimewarp;
      timertimewarp.start();
    }
  }
}

//FUNCAO DRAW - MAIN LOOP

function draw() {
  //LIMPA TELA
  clear();
  //FAZ O FUNDO BASE
  background(23, 13, 45);
  // COR DO FOREGROUND
  fill(133, 133, 155);
  //LIGA A CAMERA
  camera.on();

  //STATE MACHINE DO JOGO

  if (n1 == 0) {
  } //abertura
  //fundo()
  if (n1 == 1) {
    // tela inicial
    if (n2 == 0) {
      //inicializa tela
      initelainicio();
    }
    if (n2 == 1) {
      //aguardando toque na tela
      telainicio();
    }
    if (n2 == 2) {
      //destroi tela inicial
      telainicioDestroy();
    }
  }

  if (n1 == 2) {
    // rotinas do jogo
    fundo();
    //inicia com 2

    if (n2 == 0) {
      //inicializa jogo
      inijogo();
    }
    if (n2 == 1) {
      //processa timewarp
      dotimewarp();

      //mantem nisso até morrer

      jogo();

      //VERIFICA SE LEVELUP
      doLevelup();
    }
    if (n2 == 2) {
      //GAME OVER - DESTROI  - chama N1 = 1 , N2 = 0
      jogoDestroy();
    }
    if (n2 == 3) {
      textSize(42);
      text("LEVEL UP !!!\n     Score:\n       " + score, 100, -87);
      //mostra as cartas e permanece aqui por 5 segundos e sai sem a melhoria

      if (timerlevelup2.expired()) {
        dlevelup();
      }
    }
  }

  updateEstrelas();

  allSprites.draw();

  gcartas.draw();

  updateSprites(veljogo / 60);
  let fps = frameRate();

  textSize(20);
  noStroke();

  text("FPS: " + fps.toFixed(2), width - 20, height + height * 0.2);
  // text("@zednaked", -80, height + height * 0.2);
}
