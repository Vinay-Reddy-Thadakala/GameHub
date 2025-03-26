let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let gameContainer = document.querySelector(".container");

let turnO = true;  // Keeps track of whose turn it is (O goes first).
let count = 0; // is used to detect a draw (if all boxes are filled without a winner).

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], 
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        boxClickPlaySound()
        if (turnO){
            box.innerText = "O";
            box.classList.add("styling-o");
            box.classList.remove("styling-x");
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.classList.add("styling-x");
            box.classList.remove("styling-o");
            turnO = true;
        }

        box.disabled = true; // Prevents clicking the same box again
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner){
            drawGame();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                showWinner(pos1Val); 
                return true;  
            }
        }
    }
};

const showWinner = (winner) =>{
    message.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide");
    resetGameBtn.classList.add("hide");
    disableBoxes();
    gameWinPlaySound();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const newGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();    
    msgContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetGameBtn.classList.remove("hide");
    newGamePlaySound()
}

const drawGame = () => {
    message.innerText = "It's a tie! Well played, both of you!";
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide");
    resetGameBtn.classList.add("hide");
    disableBoxes();
    gameDrawPlaySound();
}

newGameBtn.addEventListener("click", newGame);
resetGameBtn.addEventListener("click", newGame);

//sound effects
function boxClickPlaySound() {
    document.getElementById("box-click-sound").play();
}

function newGamePlaySound() {
    document.getElementById("new-game-sound").play();
}

function gameWinPlaySound() {
    document.getElementById("game-win-sound").play();
}

function gameDrawPlaySound() {
    document.getElementById("game-draw-sound").play();
}