import { getinputDirection } from "./input.js"

export const SNAKE_SPEED = 2
let newSegments = 0
const snakeBody = [{x: 11, y: 11}]


export function update() {
    addSegments()
    const direction = getinputDirection()
    //Starting at tail, take position of segment in front and move there
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = { ...snakeBody[i] }      
    } 
    //Now move the head
    snakeBody[0].x += direction.x
    snakeBody[0].y += direction.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.style.gridRowStart = segment.y
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPosition(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersect() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for (let i = 0; i < newSegments; i++) {
        snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.lenth -1]}
    }
    newSegments = 0
}