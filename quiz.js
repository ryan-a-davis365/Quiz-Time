const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is 10 + 10?",
        choice1: "20",
        choice2: "50",
        choice3: "30",
        choice4: "10",
        answer: 1
    },
    {
        question: "What is 30 + 30?",
        choice1: "50",
        choice2: "40",
        choice3: "80",
        choice4: "60",
        answer: 4
    },
    {
        question: "What is 15 + 15?",
        choice1: "50",
        choice2: "40",
        choice3: "30",
        choice4: "60",
        answer: 3
    }
];

//Constants//
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

function getNewQuestion() {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        getNewQuestion();
    });
});

startGame();