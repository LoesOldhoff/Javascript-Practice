//Ready canvas
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//Track mouse
const mouse = {x: undefined, y: undefined};
canvas.addEventListener('mousemove', function(e){mouse.x = e.x; mouse.y = e.y});

//Track 'w'
let move = false;
document.addEventListener('keydown', function(e){
    if (e.key === 'w'){
        move = true
    }});
document.addEventListener('keyup', function(e){
    if (e.key === 'w'){
        move = false
    }});

//Control fps (in animate())
let lastRenderTime = 0;
const gameSpeed = 65;


class SnakeHead {
    constructor(){
        this.x = 800;
        this.y = 500;
        this.size = 40;
        this.rotation = 0;
        this.speed = 30;
        this.dx = 0;
        this.dy = 0;
        this.move = false;
    }   
    draw(){
        if (move){
        this.x += this.dx/this.speed;
        this.y += this.dy/this.speed;
        }
        ctx.save();
        ctx.fillStyle = 'green';
        ctx.translate(this.x, this.y);    
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.size/2, -(this.size+20)/2, this.size, this.size+20);
        ctx.restore();
    }    
    update(){
        this.rotation = Math.atan2(mouse.x - this.x, -(mouse.y - this.y));
        if (!isNaN(mouse.x) && !isNaN(mouse.y)) {
            this.dx = mouse.x - this.x;
            this.dy = mouse.y - this.y;
        }
    }
}

let mySnake = new SnakeHead();

function animate(currentTime){
    //Control fps
    window.requestAnimationFrame(animate);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if (secondsSinceLastRender < 1/gameSpeed){
        return 
    }
    lastRenderTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawRectangle();
    mySnake.update();
    mySnake.draw();
    requestAnimationFrame(animate);
}
animate();

