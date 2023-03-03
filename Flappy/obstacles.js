const obstacleArray = [];

class Obstacle(){
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20;
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.width = 20;
        this.x = canvas.width;
        this.color = 'hsl(' + hue + '100%, 50%)';        
    }
    draw(){
        ctx.FillStyle(this.color);
        ctx.FillRect(this.x, 0, this.width, this.top);
        ctx.FillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update(){
        this.x -= gamespeed;
        this.draw();
    }
}

function handleObstacle(){
    if (frame%50 === 0){
        obstacleArray.unshift(new Obstacle);
        
    }
}
