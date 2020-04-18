const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/school.jpg";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    createCanvas(1400,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(700,height,1400,20);
    platform = new Ground(100, 305, 300, 170);
    bird = new Bird(150,50);
    slingshot = new SlingShot(bird.body,{x:150, y:50});

    
    //Boxes beside pig1.
    box1 = new Box(525,360,70,70);
    box2 = new Box(745,360,70,70);
    //First pig in the first building.
    pig1 = new Pig(635, 375);
    //Log above pig1.
    log1 = new Log(635,300,300,20, PI/2);

    //Boxes beside pig2.
    box3 = new Box(535,280,70,70);
    box4 = new Box(745,280,70,70);
    //Second pig in the first building.
    pig2 = new Pig(635, 285);
    //Log above pig2.
    log2 =  new Log(635,220,300,20, PI/2);

    //Logs around pig1
    log3 = new Log(940,300,150,20,PI);
    log4 = new Log(1030,300,150,20,PI);
    //Lower left pig.
    pig3 = new Pig(985, 375);
    //Box above pig1.
    box5 = new Box(985,200,100,50);

    //Logs around pig2.
    log5 = new Log(1140,300,150,20,PI);
    log6 = new Log(1230,300,150,20,PI);
    //Lower right pig.
    pig4 = new Pig(1185, 375);
    //Box above pig2
    box6 = new Box(1185,200,100,50);

    //First horizontal log.
    log7 = new Log(1085,185,350,20,PI/2);
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35);
        fill("red");
        text("Score  " + score, width-300, 50);
        textSize(18);
        text("If your score reaches 800,",300,25);
        text("You have won.",250,50);
        text("If you go out of the screen,",300,75);
        text("better luck next time.",300,100);

    Engine.update(engine);

    ground.display();
    bird.display();
    platform.display();
    slingshot.display();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
    log5.display();
    log6.display();
    log7.display();
    
    pig1.display();
    pig2.display();
    pig3.display();
    pig4.display();

    pig1.score();
    pig2.score();
    pig3.score();
    pig4.score();

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.position.x < 1200 && bird.body.position.x > 0 && bird.body.speed < 1){
        Matter.Body.setPosition(bird.body, {x: 200,y: 50});
        slingshot.attach(bird.body);
        bird.trajectory = [];
        gameState = "onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/play.jpg";
    }
    else{
        bg = "sprites/school.jpg";
    }
    backgroundImg = loadImage(bg);
}    