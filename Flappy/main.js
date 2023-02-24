const canvas = document.getElementById("Canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400; 
const gameSpeed = 2;

let spacepressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.draw();
    handleParticles();
    requestAnimationFrame(animate);
    angle += 0.3;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space') spacepressed = true;
})
window.addEventListener('keyup', function(e){
    if(e.code === 'Space') spacepressed = false;
})