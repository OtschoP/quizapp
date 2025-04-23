let currentQuestion = 0;
let rightAnswersCounter = 0;
let SFX_SUCCESS = new Audio('sfx/right.ogg');
let SFX_FAIL = new Audio('sfx/wrong.ogg');



function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('next').disabled = true;
    showQuestion();

}

function showQuestion() {
    if (gameOver()) {
        renderEndScreen();
    }
    else {
        updatePercentage();
        updateNextQuestion();

    }
}

function gameOver() {
    return currentQuestion >= questions.length;
}

function renderEndScreen() {
    document.getElementById('card-container').innerHTML = getEndScreenTemplate();
}

function updateNextQuestion() {


    let question = questions[currentQuestion];

    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
    document.getElementById('next').disabled = true;
}

function updatePercentage() {
    let percentage = Math.round((currentQuestion + 1) / questions.length * 100);
    document.getElementById('progress-bar').innerHTML = `${percentage} %`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

function answer(selection) { //selection wurde aus onclick('answer_1' oder answer_2 usw) übergeben und definiert die ausgewählte Antwort
    let question = questions[currentQuestion]; // Variable mit aktueller Frage 
    let selectedQuestionNumber = selection.slice(-1); // Variable, die nur die Zahl der selection ausgibt (answer_3) es wird nur die letzte Stelle ausgegeben (3)
    let idOfRightAnswer = `answer_${question['right-answer']}`; // Variable mit der richtigen Antwort; question fragt ab, bei welcher Frage wir sind

    document.getElementById('next').disabled = false;

    if (rightAnswerSelected(selectedQuestionNumber, question)) { // es wird geprüft ob die Antwort Nummer mit der Nummer der richtigen Antwort übereinstimmen
        document.getElementById(selection).parentNode.classList.add('bg-success'); // fügt der selection eine Klasse hinzu. selection entspricht id (siehe index.html)
        SFX_SUCCESS.play();
        rightAnswersCounter++;
    }
    else {
        SFX_FAIL.play();
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // parentNode fügt dem übergeordneten Elternelement der id die Klasse hinzu
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right-answer']
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    let answerCards = document.getElementsByClassName('card');

    for (let index = 0; index < answerCards.length; index++) {
        answerCards[index].classList.remove('bg-success');
        answerCards[index].classList.remove('bg-danger');
    }
}



function reload() {
    location.reload();
}