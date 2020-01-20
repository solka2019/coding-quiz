// alert("starting script.js");

let start = document.getElementById("start");
let quiz = document.getElementById("quiz");
let score = document.getElementById("score")

let question = document.getElementById("question");
let counter = document.getElementById("counter");
let answerResult = document.getElementById("answerResult");
let highScoreList = document.getElementById("highScoreList");

let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");

let questionTime = 15;
let count = 0;

let TIMER = setInterval(counterRender, 1000);

let highScoresText = localStorage.getItem("jsQuizResults");
let highScores = null;


if (highScoresText != null) {
    console.log(highScoresText);
    highScores = JSON.parse(highScoresText);
}

if (highScores == null || highScores.length == 0) {
    // create a default list of scores
    highScores = [{
            initials: "aaa",
            score: 100
        },
        {
            initials: "bbb",
            score: 90
        },
        {
            initials: "ccc",
            score: 80
        },
        {
            initials: "ddd",
            score: 70
        },
        {
            initials: "eee",
            score: 60
        },
        {
            initials: "fff",
            score: 50
        }
    ];
}



for (var c = 0; c < highScores.length; c++) {
    let inner = highScoreList.innerHTML;
    inner += "<li>" + highScores[c].initials + " " + highScores[c].score + "</li>";
    highScoreList.innerHTML = inner;
}

/*
var highScores = [
   
]

highScores[0].initials == "mfk"

*/
// run the counterRender every 1sec
// stop running : setInterval()
clearInterval(TIMER);

let lastQuestionIndex = questions.length - 1;
// array.length -> 4 
// array = [a,b,c,d]
let runningQuestionIndex = 0;
// above is the question the user is on
// the next question will be the current, increment by 1 ++
// runningQuestionIndex++
// renderQuestion()
let gameScore = 0;
// below: define function
function answerIsCorrect() {
    console.log("got a correct answer");
    answerResult.innerHTML = "<p>Correct!</p>"
    // below: call function
    setTimeout(
        goToNextQuestionOrEndGame , 2000);
}

// answer is Wrong
function answerIsWrong() {
    console.log("got a wrong answer");
    answerResult.innerHTML = "<p>Incorrect!</p>"

    setTimeout(goToNextQuestionOrEndGame, 2000);
}

function renderQuestion() {
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    answerResult.innerHTML = "<p></p>";
}

// runningQuestionIndex = 0;
// renderQuestion()
// runningQuestionIndex++
// renderQuestion()
function counterRender() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        count++;
    } else {
        // if the user exceed the question time, we need to set the counter to 0
        // if the user doesn't answer the question because of time, the answer is wrong
        count = 0;
        answerIsWrong();
        // alert("times up - " + runningQuestionIndex + "<" + lastQuestionIndex);

        goToNextQuestionOrEndGame();
    }
}

function checkAnswer(answer) {
    // alert("checkAnswer was called with answer == " + answer);
    if (questions[runningQuestionIndex].correct == answer) {
        gameScore++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
}

function goToNextQuestionOrEndGame() {
    if (runningQuestionIndex < lastQuestionIndex) {
        count = 0;
        runningQuestionIndex++;
        renderQuestion();
    } else {
        // alert("goToNextQuestionOrEndGame has not more questions");
        clearInterval(TIMER);
        // alert("goToNextQuestionOrEndGame calling scoreRender");
        scoreRender();
    }
}
// alert("before add listener");
start.addEventListener("click", startQuiz);


// it is outside the function, so any other function can access the timer
function startQuiz() {
    // alert("fcn startQuiz has started");
    // prepare de screen (hide the start and the score, and show the quiz)
    start.style.display = "none";
    score.style.display = "none";
    quiz.style.display = "block";
    counterRender();
    TIMER = setInterval(counterRender, 1000);
    renderQuestion();

    // in my html, I set the display style to "none"
    // Ternary Operator - condition? ExprTrue : ExprFalse;
}

function scoreRender() {
    // alert("scoreRender start");
    // prepare de screen (hide the start and the score, and show the quiz)
    start.style.display = "none";
    score.style.display = "block";
    quiz.style.display = "none";
    let scorePerCent = 0;
    let message;
    if (gameScore > 0) {
        scorePerCent = Math.round(100 * gameScore / questions.length);
        message = "<p>Your score was " + scorePerCent + "%</p>";
    } else {
        message = "<p>You didn't get any answer correctly!</p>";
    }

    score.innerHTML = message;

    localStorage.setItem("jsQuizResults", JSON.stringify(highScores));
}