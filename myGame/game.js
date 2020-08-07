//canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

//snake box and total moves
const snakeBox = 20;
const totalMoves = canvasSize / snakeBox;

//food image
const apple = new Image();
apple.src = 'images/apple.png';

//sound files assinging
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();

//sound files sources
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";

//define snake

let snake = [];
snake[0] = {
    x: 9 * snakeBox,
    y: 10 * snakeBox
};


//create food

let food = {};
getFood();

//score

let score = 0;

//snake direction
let dir = "";

document.addEventListener("keydown", direction);

function direction() {
    let key = event.keyCode;
    if (key == 37 && dir != "RIGHT") {
        dir = "LEFT";
        left.play();
    }else if (key ==38 && dir != "DOWN") {
        dir = "UP";
        up.play();
    }else if (key==39 && dir != "LEFT") {
        dir = "RIGHT";
        right.play();
    } else if (key==40 && dir != "UP") {
        dir = "DOWN";
        down.play();
    }
}

function getFood(params) {
    food = {
        x: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox,
        y: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox
    };
}

//collision to the body  function
function collisionDetect(head,ar) {
    for (let i = 0; i < ar.length; ++i) {
       if (ar[i].x == head.x && ar[i].y==head.y) {
           return true;
       }
        
    }
    return false;
}


function render() {
    ctx.fillStyle = "#dcdcdc";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; ++i) {
        ctx.fillStyle = i == 0 ? "#4CAF50" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, snakeBox, snakeBox);
        ctx.strokeStyle = "#E91E63";
        ctx.strokeRect(snake[i].x, snake[i].y, snakeBox, snakeBox);
    }


    ctx.drawImage(apple, food.x, food.y, snakeBox, snakeBox);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir == "LEFT") snakeX -= snakeBox;
    if (dir == "RIGHT") snakeX += snakeBox;
    if (dir == "UP") snakeY -= snakeBox;
    if (dir == "DOWN") snakeY += snakeBox;

    //if snake eats
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        getFood();
    }
    else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || collisionDetect(newHead,snake)) {
        gameOver();
        return;
    }

    snake.unshift(newHead);

    //score display
    ctx.fillStyle = "black";
    ctx.font = "40px tahoma";
    ctx.fillText(score,10, 40);


}




render();

let gm = setInterval(render, 100);


//GameOver function
function gameOver() {
    clearInterval(gm);
    dead.play();
    ctx.fillStyle = "black";
    ctx.font = "40px tahoma";
    ctx.fillText("Plingi Paru!!!", canvasSize / 2 - 100, canvasSize / 2);
}