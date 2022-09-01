const userInput = {mouseX: 0, mouseY: 0, wKey: false};

//Track mouse
document.addEventListener('mousemove', function(e){userInput.mouseX = e.x; userInput.mouseY = e.y});

//Track W key 
document.addEventListener('keydown', function(e){
    if (e.key === 'w'){
        userInput.wKey = true;
    }});
document.addEventListener('keyup', function(e){
    if (e.key === 'w'){
        userInput.wKey = false;
    }});

/* export function getUserInput(){
    return userInput;
}
 */
