import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersect } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

const gameBoard = document.getElementById('gameboard')
let lastRenderTime = 0
let gameOver = false

//Endless loop to keep the game going
function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    console.log('Render')
    lastRenderTime = currentTime    

    update()
    draw()

    if (gameOver){
        if (confirm("You've lost. Press OK to restart")) {
            window.location.reload()
        }
        return 
    }
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

//Start endless loop 
window.requestAnimationFrame(main)

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect()}