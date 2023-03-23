const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let boids = [];
let centerx = canvas.width/2;
let centery = canvas.height/2; 

class Boid {
    constructor(x, y, radius, angle, length, velocity, turnspeed, v1x, v1y, v2x, v2y, v3x, v3y, vtx, vty){
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
        this.v3x = v3x;
        this.v3y = v3y;
        this.vtx = vtx;
        this.vty = vty;

    }

    draw(){
        
        //draw tail
        ctx.beginPath();
        let tailx = this.x - this.length*Math.sin(this.vtx)
        let taily = this.y - this.length*Math.cos(this.vty)
        ctx.arc(tailx, taily, this.radius*0.5, 0, Math.PI * 2, true)
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        //draw v1
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#062104';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.v1x, this.y + this.v1y);  
        ctx.stroke();
        ctx.closePath();
        
        //draw v2
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#21040f';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.v2x, this.y + this.v2y);  
        ctx.stroke();
        ctx.closePath();

        //draw True angle
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'magenta';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vtx, this.y + this.vty);  
        ctx.stroke();
        ctx.closePath();

        //draw v3
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.v3x, this.y - this.v3y);  
        ctx.stroke();
        ctx.closePath();

        //draw head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'red';
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

        //Calculate v1 (cohesion)
        this.v1x = (centerx - this.x);
        this.v1y = (centery - this.y);

        //Calculate v2 (separation)
        this.v2x = 0;
        this.v2y = 0;
        for (let i = 0; i < boids.length; i++){
            let a = boids[i].x - this.x
            let b = boids[i].y - this.y
            let distance = Math.sqrt(a*a + b*b)
            if (distance < 100 && distance != 0){
                this.v2x -= boids[i].x - this.x
                this.v2y -= boids[i].y - this.y
            }          
        }

        //Calculate v3 (alignment)
        this.v3x = 0;
        this.v3y = 0;
        let avvx = 0;
        let avvy = 0;
        let closeboids = 0;
        for (let i = 0; i < boids.length; i++){
            let a = boids[i].x - this.x;
            let b = boids[i].y - this.y;
            let distance = Math.sqrt(a*a + b*b)
            if (distance < 100 && distance != 0){
                avvx += boids[i].x - (boids[i].x + boids[i].vtx);
                avvy += boids[i].y - (boids[i].y + boids[i].vty);
                closeboids += 1;
            }
        }
        if (closeboids != 0){
        this.v3x = avvx/closeboids;
        this.v3y = avvy/closeboids;
        }

        this.vtx = (this.v1x + this.v2x + this.v3x)/3; 
        this.vty = (this.v1y + this.v2y + this.v3y)/3;    

        
        //Fly
        this.x = this.x + (this.vtx/100);
        this.y = this.y + (this.vty/100);
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
    centerx = x;
    centery = y;
}


function init(){
    boids = [];
    let numberOfBoids = 10;
    let guard = 100;
    while(boids.length < numberOfBoids && boids.length < guard){
        let startx = Math.random() * canvas.width;
        let starty = Math.random() * canvas.height;
        let startangle = Math.random();
        let boid = {
            x: startx,
            y: starty,
            length: 20,
            radius: 10,
            angle: startangle,          
            velocity: 1,
            turnspeed: 0.1,
            v1x: 0,
            v1y: 0, 
            v2x: startx,
            v2y: starty,
            v3x: startx,
            v3y: starty,
            vtx: startx,
            vty: starty
        };
        boids.push(new Boid(boid.x, boid.y, boid.radius, boid.angle, boid.length, boid.velocity, 
            boid.turnspeed, boid.v1x, boid.v1y, boid.v2x, boid.v2y, boid.v3x, boid.v3y, boid.vtx, boid.vty));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < boids.length; i++) {
        boids[i].draw();
        boids[i].move();
        drawcenter();
    }
}

init();
animate();
