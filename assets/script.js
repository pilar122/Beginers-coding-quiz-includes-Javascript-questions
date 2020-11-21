var body = document.querySelector("body");
var timer = document.querySelector("#time");
var instructions = document.querySelector(".instructions");
var beginButtonClick = document.querySelector("#beginButton");
var questionP = document.querySelector(".question");
var choicesBlock = document.querySelector(".choices");
var result = document.querySelector(".result");
var finalScore = document.querySelector(".final-score");
var endOfGame = document.querySelector(".end-of-game");

var buttonAnswerA = document.querySelector("#answer1");
var buttonAnswerB = document.querySelector("#answer2");
var buttonAnswerC = document.querySelector("#answer3");
var buttonAnswerD = document.querySelector("#answer4");

var submitInitials = document.querySelector(".initial-form");

var currentTime = timer.textContent;
var currentQuestion = 0;

 
var highScore = localStorage.getItem("highscore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
    highScore = 0;
}

var questions = [{
        ask: "Which element creates the biggest heading?",
        answers: ["<h1></h1>", "<h2></h2>", "<h3></h3>", "<h4></h4>"],
        correctAnswer: 0
    },
    {
        ask: "What does the <p> tag stand for",
        answers: ["paragraph", "punctuation", "preference", "peak"],
        correctAnswer: 0
    },
    {
        ask: "Pick the opening tag?",
        answers: ["</h1>", "<h1>", "<open>", "<body>"],
        correctAnswer: 1
    },
    {
        ask: "How do you start an IF statement in JavaScript?",
        answers: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
        correctAnswer: 3
    },
    {
        ask: "How do you declare a JavaScript variable?",
        answers: ["v carName;", "var carName;", "variable carName;", "v (carName);"],
        correctAnswer: 1
    },
    {
        ask: "Which operator is used to assign a value to a variable?",
        answers: ["x", "*", "-", "="],
        correctAnswer: 3
    }
]

function quizQuestion(timerInterval) {
    checkTime(timerInterval);

    
    if (currentQuestion < questions.length) {
        questionP.textContent = questions[currentQuestion].ask;

        buttonAnswerA.textContent = questions[currentQuestion].answers[0];
        buttonAnswerB.textContent = questions[currentQuestion].answers[1];
        buttonAnswerC.textContent = questions[currentQuestion].answers[2];
        buttonAnswerD.textContent = questions[currentQuestion].answers[3];
    } else {
        endGame();
    }
}

function checkAnswer() {
    
    this.style.outline = "none";

    
    if ((this.textContent) == (questions[currentQuestion].answers[questions[currentQuestion].correctAnswer])) {
        result.textContent = "CORRECT";
    } else {
        currentTime -= 10;
        result.textContent = "WRONG";
        if (currentTime < 1) {
            endGame();
        }
    }

    currentQuestion++;

    quizQuestion();
}


function checkTime(timerInterval) {
    if (currentQuestion == questions.length) {
        clearInterval(timerInterval);
        endGame();
    } else if (currentTime <= 0) {
        timer.textContent = 0;
        currentTime = 0;
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    questionP.style.display = "none";
    choicesBlock.style.display = "none";
    result.style.display = "none";
    endOfGame.style.display = "block";

    
    if (currentTime > parseInt(localStorage.getItem("highScore"))) {
        finalScore.textContent = ("You have the new high score! Your final score is " + currentTime + ".");
    } else {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    }
}


function resetGame() {
    var user_initials = document.querySelector("#user_initials").value;

    localStorage.setItem("highScore", currentTime);
    localStorage.setItem(user_initials, currentTime);
}

beginButtonClick.addEventListener("click", function () {
    var timerStart = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime;
        checkTime(timerStart);
    }, 1000)

    instructions.style.display = "none";
    choicesBlock.style.display = "block";

    quizQuestion(timerStart);
})


var buttons = document.querySelectorAll(".answer-choice").forEach(function (item) {
    item.addEventListener("click", checkAnswer);
})