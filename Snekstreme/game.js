//import {SnakeHead} from './snake.js';

//Ready canvas
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//Control fps (in animate())
let lastRenderTime = 0;
const gameSpeed = 65;

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
    Snake.update();
    Snake.draw();
    requestAnimationFrame(animate);
}
animate();

