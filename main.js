import {updateSnake, getGameOver} from "./snake.js"
import {getDirection, shiftDirection} from "./direction.js"
// Framerate engine

let lastRenderTime = 0 
let frameRate = 4
function main(currentTime){
    window.requestAnimationFrame(main)
    if(!getGameOver()){
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
        if(secondsSinceLastRender < 1 / frameRate) return
        lastRenderTime = currentTime
        update()
    }
}
window.requestAnimationFrame(main)

// Everything that updates per frame

function update(){
    if(getDirection().length>1) shiftDirection() // managing multiple directions
    updateSnake()
}
