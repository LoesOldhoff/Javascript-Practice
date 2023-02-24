const obstacleArray = [];

class Obstacle{
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20;
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsla(' + hue + ', 100%, 50%, 0.8)';

    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update(){
        this.x -= gamespeed;
        this.draw();
    }
}

function handleObstacles(){
    if(frame%50 === 0){
        obstacleArray.unshift(new Obstacle);
    }
    for(let i = 0; i < obstacleArray.length; i++){

    }

}