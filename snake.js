import {getDirection, setDirection} from "./direction.js"
const board = document.getElementById("board")
const gameOverElement = document.getElementsByClassName("game-over")[0]
const restartButton = document.getElementById("restart-button")
const scoreElement = document.getElementById("score")
const highScoreElement = document.getElementById("high-score")

let snake = [{x:12,y:10}, {x:11,y:10}, {x:10,y:10}]
let food = {x: getRandomInt(20), y: getRandomInt(20)}
let gridWidth = 20 // not connected with grid size in css
let gridHeight = 20
let score = 0
let highScore = 0
let gameOver = false

export function updateSnake(){
    updatePositions() // updates the snake parts' posiotions
    checkCollisions() // checks collition with food, snake and walls
    if (gameOver)return
    drawSnake() // creates snake as dom elements with needed classes
    drawFood() // creates food as dom element
}

function drawSnake(){
    let direction = getDirection()[0]
    board.innerHTML = ''
    for (var i = 0; i < snake.length; i++){
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = snake[i].y
        snakeElement.style.gridColumnStart = snake[i].x
        snakeElement.classList.add("snake")
        if (i==0) {
            if(direction.y == -1) snakeElement.classList.add("head-up")
            else if (direction.y == 1) snakeElement.classList.add("head-down")
            else if (direction.x == 1) snakeElement.classList.add("head-right")
            else if (direction.x == -1) snakeElement.classList.add("head-left")
        } else if (i==snake.length-1) {
            if(snake[i-1].y-snake[i].y == -1) snakeElement.classList.add("tail-up")
            else if(snake[i-1].y-snake[i].y == 1) snakeElement.classList.add("tail-down")
            else if(snake[i-1].x-snake[i].x == 1) snakeElement.classList.add("tail-right")
            else if(snake[i-1].x-snake[i].x == -1) snakeElement.classList.add("tail-left")
        }
        board.appendChild(snakeElement)
    }
}

function updatePositions(){
    let direction = getDirection()[0]
    for (let i = snake.length-1; i > 0; i--){
        snake[i].x = snake[i-1].x
        snake[i].y = snake[i-1].y
    }
    snake[0].x += direction.x
    snake[0].y += direction.y
}

function drawFood(){
    const foodElement = document.createElement("div")
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart = food.y
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}

function updateFood(){
    food = {x: getRandomInt(20), y: getRandomInt(20)}
    let change = false
    snake.forEach(segment =>{
        if (segment.x == food.x && segment.y == food.y) change = true
    })
    if (change) updateFood()
}

function checkCollisions(direction){
    if (snake[0].x == food.x && snake[0].y == food.y) {
        updateFood()
        snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y})
        score++
    }
    if (snake[0].x > gridWidth || snake[0].x < 1 || snake[0].y > gridHeight || snake[0].y < 1){
        endGame()
        return
    }
    for (var i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            endGame()
            return
        }
    }
}

function endGame(){
    gameOver = true
    if (score > highScore) highScore = score
    showRestart()
}

function showRestart(){
    gameOverElement.classList.add("show")
    scoreElement.innerHTML="Score "+score
    highScoreElement.innerHTML="High Score "+highScore
}
function hideRestart(){
    gameOverElement.classList.remove("show")
}

function restartGame(){
    setDirection([{x:1, y:0}])
    snake = [{x:12,y:10}, {x:11,y:10}, {x:10,y:10}]
    score = 0
    updateFood()
    gameOver = false
    hideRestart()
}

restartButton.addEventListener('click', restartGame)

export function getGameOver(){
    return gameOver
}

function getRandomInt(max) {
    return Math.floor((Math.random()) * max)+1;
}