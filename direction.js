let direction = [{x:1, y:0}]

window.addEventListener('keydown', e => {
    if(direction.length<=2){
        switch(e.key){
            case 'ArrowUp':
                if (direction[direction.length-1].y != 1) direction.push({x: 0, y:-1})
                break
            case 'ArrowDown':
                if (direction[direction.length-1].y != -1) direction.push({x: 0, y:1})
                break
            case 'ArrowRight':
                if (direction[direction.length-1].x != -1) direction.push({x: 1, y:0})
                break
            case 'ArrowLeft':
                if (direction[direction.length-1].x != 1) direction.push({x: -1, y:0})
                break
        }
    }
})

export function setDirection(newDir){
    direction=newDir
}
export function shiftDirection(){
    direction.shift()
}
export function getDirection(){
    return direction
}