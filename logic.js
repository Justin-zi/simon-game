
let gamePattern = [];

let userClickedPattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let levelNumber = 0;

let gameStart = false;

document.querySelector("body").addEventListener('keydown', () => {

    if(!gameStart) {
        document.querySelector("h1").textContent = `Level ${levelNumber}`;
        nextSequence();
        gameStart = true;
    }
});

document.querySelector(".container").addEventListener('click', function(e) {
    
    let userChosenColour;

    if(e.target.classList.contains("btn")) {
        userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        // console.log(userClickedPattern.length)
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }

    
});


const nextSequence = () => {
    userClickedPattern = [];
    levelNumber++;
    document.querySelector("h1").textContent = `Level ${levelNumber}`;

    let randomNumber = Math.floor(Math.random() * 4); 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeOut(150).fadeIn(150);

    playSound(randomChosenColor);

    // document.querySelector("h1").textContent = `Level ${levelNumber}`;
}

const playSound = (color) => {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");

    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
              }, 1000);
        }
    }
    else {
        wrongAnswer();
        document.body.classList.add("game-over");
        document.querySelector("h1").textContent = "Game over, press any key to restart";
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 300);
        startOver();
    }

}

function wrongAnswer() {
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
}

let startOver = () => {
    levelNumber = 0;
    gamePattern = [];
    gameStart = false;
}