class Log extends BaseClass{
  constructor(x,y,height,width,angle){
    super(x,y,20,height,width,angle);
    this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);
  }
}