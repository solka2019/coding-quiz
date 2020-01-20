alert("comecando o script.js");

let start = document.getElementById("start");
let quiz = document.getElementById("quiz");
let question = document.getElementById("question");
let counter = document.getElementById("counter");

let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");

let questionTime = 15;
let count = 0;

let TIMER = setInterval(counterRender, 1000);
// run the counterRender every 1sec
// stop running : setInterval()
clearInterval(TIMER);

// questions[0].question
// questions[0].choiceA
// questions[0].choiceB
// questions[0].choiceC
// questions[0].choiceD
// questions[0].correct

let lastQuestionIndex = questions.length - 1;
// array.length -> 4 
// array = [a,b,c,d]
let runningQuestionIndex = 0;
// above is the question the user is on
// the next question will be the current, increment by 1 ++
// runningQuestionIndex++
// renderQuestion()


function renderQuestion() {
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
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

        if (runningQuestionIndex < lastQuestionIndex) {
            // if there are still questions, it is true, then do the next step
            runningQuestionIndex++;
            questionRender();
        } else {
            clearInterval(TIMER);
            scoreRender();
            // show the score to the user - scoreRender
        }
    }
}

function checkAnswer(answer) {
    if (questions[runningQuestionIndex].correct == answer) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }

    if (runningQuestionIndex < lastQuestionIndex) {
        count = 0;
        runningQuestionIndex++;
        questionRender();


    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

alert("antes de adicionar listener");
start.addEventListener("click", startQuiz);


// it is outside the function, so any other function can access the timer
function startQuiz() {
    alert("comecou a fcn");
    start.style.display = "none";
    counterRender();
    TIMER = setInterval(counterRender, 1000);
    questionRender();
    quiz.style.display = "block";
    // in my html, I set the display style to "none"
    // Ternary Operator - condition? ExprTrue : ExprFalse;
}

function scoreRender() {
    scoreContainer.style.display = "block";
    let scorePerCent = Math.round(100 * score / questions.length);

}

