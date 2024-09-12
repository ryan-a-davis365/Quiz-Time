const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const questionSelect = document.getElementById('questionSelect');
const difficultySelect = document.getElementById('difficultySelect');
const categorySelect = document.getElementById('categorySelect');
const load = document.getElementById('loading');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = []

fetch('https://opentdb.com/api_category.php')
.then(response => response.json())
.then(category => {
    let categorySelect = category.trivia_categories;
    categorySelect.forEach(category => {

        let categoryOption = document.createElement("option");
        let categoryName = document.createElement("p");
        let name = document.createTextNode(category.name);

        categoryName.appendChild(name);
        categoryOption.appendChild(categoryName);
        categoryOption.id = category.id;
        categoryOption.classList.add("category");
        document.getElementById("categorySelect").appendChild(categoryOption);
    });
})
.catch(() => console.error());

//Constants//
const CORRECT_BONUS = 1;

function getQuestions() {
    let selectedCategory = document.getElementById('categorySelect');
    let categoryId = selectedCategory.options[selectedCategory.selectedIndex].id;
    let selectedDifficulty = document.getElementById('difficultySelect');
    let difficulty = selectedDifficulty.options[selectedDifficulty.selectedIndex].text.toLowerCase();
    let selectedQuestion = document.getElementById('questionSelect');
    let questionId = selectedQuestion.options[selectedQuestion.selectedIndex].text;
    fetch(`https://opentdb.com/api.php?amount=${questionId}&type=multiple&category=${categoryId}&difficulty=${difficulty}`)
        .then((res) => {
            return res.json();
        })
        .then((loadedQuestions) => {
            questions = loadedQuestions.results.map((loadedQuestion) => {
                const formattedQuestion = {
                    question: loadedQuestion.question.replaceAll('&quot;', '"').replaceAll('&#039;', `'`)
                    
                };

                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                );

                answerChoices.forEach((choice, index) => {
                    formattedQuestion['choice' + (index + 1)] = choice;
                });

                return formattedQuestion;
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}