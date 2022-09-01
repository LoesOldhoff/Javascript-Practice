class SnakeHead {
    constructor(){
        this.x = 800;
        this.y = 500;
        this.size = 40;
        this.rotation = 0;
        this.speed = 30;
        this.dx = 0;
        this.dy = 0;
    }   
    draw(){
        if (userInput.wKey){
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
        this.rotation = Math.atan2(userInput.mouseX - this.x, -(userInput.mouseY - this.y));
        if (!isNaN(userInput.mouseX) && !isNaN(userInput.mouseY)) {
            this.dx = userInput.mouseX - this.x;
            this.dy = userInput.mouseY - this.y;
        }
    }
}

const Snake = new SnakeHead();