const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let boids = [];

class Boid {
    constructor(x, y, v, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    }
}

function init(){
    boids = [];
    let numberOfBoids = 10;
    while(boids.length < numberOfBoids){
        let boid = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 5
        };
        boids.push(new Boid(boid.x, boid.y, boid.radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < boids.length; i++) {
        boids[i].draw();
    }
}
init();
animate();

window.addEventListener("resize", function(){
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    init();
})