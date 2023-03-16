const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let boids = [];
let centerx = canvas.width/2;
let centery = canvas.height/2; 

class Boid {
    constructor(x, y, radius, angle, length, velocity, turnspeed, v1x, v1y, v2x, v2y){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = angle;
        this.length = length;
        this.velocity = velocity;
        this.turnspeed = turnspeed;
        this.v1x = v1x;
        this.v1y = v1y;
        this.v2x = v2x;
        this.v2y = v2y;
    }

    draw(){
        //draw head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        //draw tail
        ctx.beginPath();
        let tailx = this.x - this.length*Math.sin(this.angle)
        let taily = this.y - this.length*Math.cos(this.angle)
        ctx.arc(tailx, taily, this.radius*0.5, 0, Math.PI * 2, true)
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

    }
    move(){
        //Turn away from the edges of the canvas
        //if(this.x < 0){
        //    this.angle += this.turnspeed;}        
        //if (this.x > canvas.width){
        //    this.angle -= this.turnspeed;}
        //if (this.y < 0){
        //    this.angle += this.turnspeed;} 
        //if (this.y > canvas.height){
        //    this.angle -= this.turnspeed;}

        //Calculate v1 (to center mass)
        this.v1x = (centerx - this.x)/500;
        this.v1y = (centery - this.y)/500;

        //Calculate v2 (repulsion)
        this.v2x = 0;
        this.v2y = 0;
        for (let i = 0; i < boids.length; i++){
            let distance = Math.log(Math.pow(boids[i].x - this.x) + Math.pow(boids[i].y - this.y))
            if (distance < 100 && distance != 0){
                console.log('yolo')
                this.v2x -= boids[i].x - this.x
                this.v2y -= boids[i].y - this.y
            }
            else {
                console.log('nah')
            }             
        }

        //this.x = this.x+(this.velocity*Math.sin(this.angle)) + this.v2x;
        //this.y = this.y+(this.velocity*Math.cos(this.angle)) + this.v2y;
        //this.x += this.v1x + this.v2x;
        //this.y += this.v1y + this.v2y;       
        this.x += this.v2x; 
        this.y += this.v2y;
    }
}

function drawcenter(){
    let x = 0;
    let y = 0;
    for (let i = 0; i < boids.length; i++){
        x += boids[i].x;
        y += boids[i].y;
    }
    x = x/boids.length;
    y = y/boids.length;
    if (x > canvas.width){
        x = canvas.width
    }
    if (y > canvas.height){
        y = canvas.height
    }
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = 'gold';
    ctx.fill();
    ctx.closePath();
}

function init(){
    boids = [];
    let numberOfBoids = 50;
    let guard = 100;
    let counter = 0;
    while(boids.length < numberOfBoids && boids.length < guard){
        let startx = Math.random() * canvas.width;
        let starty = Math.random() * canvas.height;
        let boid = {
            x: startx,
            y: starty,
            length: 20,
            radius: 10,
            angle: Math.random(),           
            velocity: 1,
            turnspeed: 0.1,
            v1x: 0,
            v1y: 0, 
            v2x: startx,
            v2y: starty
        };
        boids.push(new Boid(boid.x, boid.y, boid.radius, boid.angle, boid.length, boid.velocity, 
            boid.turnspeed, boid.v1x, boid.v1y, boid.v2x, boid.v2y));
        counter += 1;
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    console.log('hi')
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < boids.length; i++) {
        boids[i].draw();
        boids[i].move();
        drawcenter();
    }
}

init();
animate();
