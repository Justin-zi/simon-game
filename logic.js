
let gamePattern = [];

let userClickedPattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let levelNumber = 0;

let gameStart = false;




// const gameStartWithKey = document.querySelector("body").addEventListener('keydown', startGameEvent);
// const gameStartWithTap = document.querySelector("body").addEventListener('touch', startGameEvent);

// function startGameEvent() {
//     if(!gameStart) {
//         document.querySelector("h1").textContent = `Level ${levelNumber}`;
//         nextSequence();
//         gameStart = true;
//     }
// }
// document.querySelector("body").addEventListener('keydown', () => {

//     if(!gameStart) {
//         document.querySelector("h1").textContent = `Level ${levelNumber}`;
//         nextSequence();
//         gameStart = true;
//     }
// });

document.querySelector("body").addEventListener('click', function(e) {
    if(!gameStart) {
        document.querySelector("h1").textContent = `Level ${levelNumber}`;
        nextSequence();
        gameStart = true;
    }

    let userChosenColour;

    if(e.target.classList.contains("btn")) {
        userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        // console.log(userClickedPattern.length)
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        playSound(userChosenColour);
    }
});


const nextSequence = () => {
    userClickedPattern = [];
    levelNumber++;
    document.querySelector("h1").textContent = `Level ${levelNumber}`;
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    // $("#" + randomChosenColor).fadeOut(150).fadeIn(150);

    document.querySelector("#"+randomChosenColor).classList.add("pressed");
    setTimeout(function() {
        document.querySelector('#'+randomChosenColor).classList.remove("pressed");
        // $('#' + currentColor).removeClass("pressed");
    },180);

    playSound(randomChosenColor);

    if(window.matchMedia("(max-width 600px)")) {
        
    } else {
        facts(levelNumber);
    }
    
    

    // document.querySelector("h1").textContent = `Level ${levelNumber}`;
}

const playSound = (color) => {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");

    setTimeout(function() {
        document.querySelector('#'+currentColor).classList.remove("pressed");
        // $('#' + currentColor).removeClass("pressed");
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
        if(window.matchMedia("(max-width 600px)")) {
            wrongAnswer();
            document.querySelector("h1").textContent = "Game over, tap any key to restart";
            startOver();
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

function facts(level) {
    const funFacts = {
        '1': "Fun fact - Short-term memory only lasts 20 to 30 seconds.",
        '2': "Fun fact - The human brain’s storage capacity is virtually limitless.",
        '3': "Fun fact - Coffee only helps to increase alertness, it doesn’t maintain memory performances.",
        '4': "Fun fact - Sleep is significant to memory. Sleep helps in the retrieval and storage of long-term memories.",
        '5': "Fun fact - Many people link aging with memory loss. However, the memory loss people experience as they age is because they tend to exercise their brains less.",
        '6': "Fun fact - Your memory has the ability to associate a scent with a particular occurrence or event.",
        '7': "Fun fact - Just like any other part of your body, exercise is also important for your brain. The more you try to think about a memory, you can remember it more accurately. In fact, when you think, it creates a stronger connection between active neurons."
    };

    const props = Object.values(funFacts);
    const factProperties = props[Math.floor(Math.random() * props.length)];
    console.log(factProperties);

    if(levelNumber % 2 == 0) {
        document.querySelector(".smaller").textContent = factProperties;
    }
}