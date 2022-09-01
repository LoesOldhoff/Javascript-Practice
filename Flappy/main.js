const canvas = document.getElementById("Canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400; 

//Control fps (in animate())
let lastRenderTime = 0;
const gameSpeed = 10;

let spacepressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

function animate(currentTime){
     //Control fps
    window.requestAnimationFrame(animate);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if (secondsSinceLastRender < 1/gameSpeed){
        return 
    }    
    lastRenderTime = currentTime; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, 10, 50, 50);
    bird.update();
    bird.draw();
    handleParticles();
    requestAnimationFrame(animate);
    angle += 0.3;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space') spacepressed = true;
})
window.addEventListener('keyup', function(e){
    if(e.code === 'Space') spacepressed = false;
})