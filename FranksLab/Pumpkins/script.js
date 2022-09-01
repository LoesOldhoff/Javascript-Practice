const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pumpkin = new Image();
pumpkin.src = 'pump1.png';

const numberOfParticles = 50;
let particleArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.direction = Math.random() < 0.5 ? -1 : 1;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle * Math.PI/360 * this.direction);
        //ctx.fillStyle = 'red';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(pumpkin, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore();
    }
    update(){
        this.angle += 10; 
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random()* 100 + 50;
            this.speed = Math.random()* 3 + 5;
        } else{
            this.y += this.speed;
        }     
    }
}

// ctx.fillRect(130, 340, 30, 40);
const Particle1 = new Particle();
function init(){
    for (let i = 0; i < numberOfParticles; i++){
        particleArray.push(new Particle());
    }
}
init()

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}

animate();