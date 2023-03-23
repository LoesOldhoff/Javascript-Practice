const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let boids = [];

class Boid {
    constructor(x, y, radius, length, velocity, turnspeed, v1x, v1y, v2x, v2y, v3x, v3y, vx, vy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.length = length;
        this.velocity = velocity;
        this.turnspeed = turnspeed;
        this.v1x = v1x;
        this.v1y = v1y;
        this.v2x = v2x;
        this.v2y = v2y;
        this.v3x = v3x;
        this.v3y = v3y;
        this.vx = vx;
        this.vy = vy;
    }

    draw(){        
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
        ctx.lineTo(this.x + this.vx, this.y + this.vy);  
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
        //Calculate v1 (cohesion)
        let centerx = 0;
        let centery = 0;
        let neighboids = 0;
        for (let i = 0; i < boids.length; i++){
            let a = boids[i].x - this.x
            let b = boids[i].y - this.y
            let distance = Math.sqrt(a*a + b*b)
            if (distance < 400 && distance != 0){
                centerx += boids[i].x;
                centery += boids[i].y;
                neighboids += 1;
            }     
            if (distance = 0){
                this.vy1 += Math.random()*10;
                this.vy2 += Math.random()*10;
            }       
        }
        centerx = centerx/neighboids;
        centery = centery/neighboids;
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
        let avvx = 0;
        let avvy = 0;
        let closeboids = 0;
        for (let i = 0; i < boids.length; i++){
            let a = boids[i].x - this.x;
            let b = boids[i].y - this.y;
            let distance = Math.sqrt(a*a + b*b)
            if (distance < 400 && distance != 0){
                avvx += boids[i].x - (boids[i].x + boids[i].vx);
                avvy += boids[i].y - (boids[i].y + boids[i].vy);
                closeboids += 1;
            }
        }
        if (closeboids != 0){
        this.v3x = avvx/closeboids;
        this.v3y = avvy/closeboids;
        }

        //let newvx = ((this.v1x*1) + (this.v2x*1) + (this.v3x*1))/3;
        //let newvy = ((this.v1y*1) + (this.v2y*1) + (this.v3y*1))/3;   
        //this.vx += newvx*0.001;  
        //this.vy += newvy*0.001;

        this.vx = ((this.v1x*1) + (this.v2x*1) + (this.v3x*1))/3;
        this.vy = ((this.v1y*1) + (this.v2y*1) + (this.v3y*1))/3; 

        //Turn away from the edges of the canvas
        if(this.x < 100){
            this.vx += this.turnspeed;}        
        if (this.x > (canvas.width-100)){
            this.vx -= this.turnspeed;}
        if (this.y < 100){
            this.vy += this.turnspeed;} 
        if (this.y > (canvas.height-100)){
            this.vy -= this.turnspeed;}

        
        //Speed
        let a = this.x - (this.x + this.vx);
        let b = this.y - (this.y + this.vy);
        let speed = Math.sqrt(a*a + b*b);
        if (speed < this.minspeed && speed != 0){
            this.vx = (this.vx/speed)*this.minspeed;
            this.vy = (this.vy/speed)*this.minspeed;
        }
        if (speed > this.maxspeed && speed != 0){
            this.vx = (this.vx/speed)*this.maxspeed;
            this.vy = (this.vy/speed)*this.maxspeed;
        }    

        //Fly
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        }
    }

function init(){
    boids = [];
    let numberOfBoids = 50;
    let guard = 100;
    while(boids.length < numberOfBoids && boids.length < guard){
        let startx = Math.random() * (canvas.width - 100);
        let starty = Math.random() * (canvas.height - 100);
        let boid = {
            x: startx,
            y: starty,
            length: 20,
            radius: 10,          
            minspeed: 0.1,
            maxspeed: 5,
            turnspeed: 10,
            v1x: 0,
            v1y: 0, 
            v2x: startx,
            v2y: starty,
            v3x: startx,
            v3y: starty,
            vx: startx,
            vy: starty,
        };
        boids.push(new Boid(boid.x, boid.y, boid.radius, boid.angle, boid.length, boid.minspeed, boid.maxspeed, 
            boid.turnspeed, boid.v1x, boid.v1y, boid.v2x, boid.v2y, boid.v3x, boid.v3y, boid.vx, boid.vy,));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < boids.length; i++) {
        boids[i].draw();
        boids[i].move();
    }
}

init();
animate();
