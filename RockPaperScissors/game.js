let userScore = 0;
let systemScore = 0;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector("#msg");
const resetBtn = document.querySelector("#reset-btn");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");        
        playGame(userChoice);
        selectSound();
    });
});

const playGame = (userChoice) => {
    // Generate system choice.
    const systemChoice = generateSystemChoice();
    
    if (userChoice === systemChoice){
        drawGame();
    }
    else{    
        let userWin = true;

        if (userChoice === "rock"){
            //scissors, paper
            userin = systemChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper"){
            //rock, scissors
            userWin = systemChoice === "scissors" ? false : true;
        }
        else{
            //rock, paper
            userWin = systemChoice === "rock" ? false : true;
        }
        
        showWinner(userWin, userChoice, systemChoice);
    }
}

const generateSystemChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random()*3);
    return options[randomIndex];
}

const drawGame = () => {
    console.log("Game was draw");
    message.innerText = "Game was draw. Play again";
    message.classList.add("draw-msg");
    message.classList.remove("lose-msg");
    message.classList.remove("win-msg");
    message.classList.remove("first-msg");
}

const showWinner = (userWin, userChoice, systemChoice) => {
    if (userWin){
        userScore++;
        document.querySelector("#user-score").innerText = userScore;
        message.innerText = `You won! your ${userChoice} beats ${systemChoice}`;
        message.classList.add("win-msg");
        message.classList.remove("lose-msg");
        message.classList.remove("draw-msg");
        message.classList.remove("first-msg");
    }
    else{        
        systemScore++;
        document.querySelector("#system-score").innerText = systemScore;
        message.innerText = `You Lost! ${systemChoice} beats your ${userChoice}`;
        message.classList.add("lose-msg");
        message.classList.remove("win-msg");
        message.classList.remove("draw-msg");
        message.classList.remove("first-msg");
    }
}

resetBtn.addEventListener("click", () => {
    userScore = 0;
    systemScore = 0;
    document.querySelector("#user-score").innerText = 0;
    document.querySelector("#system-score").innerText = 0;
    message.innerText = "Play your move";
    message.classList.add("first-msg");
    message.classList.remove("win-msg");
    message.classList.remove("draw-msg");
    message.classList.remove("lose-msg");
    resetBtnSound();
});

//sound-effects
function selectSound() {
    document.getElementById("select-sound").play();    
}

function resetBtnSound() {
    document.getElementById("reset-btn-sound").play();    
}