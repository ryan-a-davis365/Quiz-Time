const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loading');
const game = document.getElementById('game');
const end = document.getElementById('end');
const home = document.getElementById('home');
const questionSelect = document.getElementById('questionSelect');
const difficultySelect = document.getElementById('difficultySelect');
const categoryArray = document.getElementById('categorySelect');
const finalScore = document.getElementById('finalScore');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let selectedNumberOfQuestions
let restartQuiz = document.getElementById("restartSame")
let restartNew = document.getElementById("restartNew")
const CORRECT_BONUS = 1;

/**
 * Gets the categories to allow the user to choose quiz
 */

function getCategories() {
  loadingWheel(true);
  fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(category => {
      const categoryArray = category.trivia_categories;
      categoryArray.forEach((category) => {

        const categoryOption = document.createElement("option");
        const categoryName = document.createElement("p");
        const name = document.createTextNode(category.name);

        categoryName.appendChild(name);
        categoryOption.appendChild(categoryName);
        categoryOption.id = category.id;
        categoryOption.classList.add("category");
        categorySelect.appendChild(categoryOption);
      });
      loadingWheel(false);
      home.classList.remove("hidden");
    })
    .catch(() => console.error());
}

/**
 * Gets the questions
 */

function prepareUrl() {
  const categoryId = categorySelect.options[categorySelect.selectedIndex].id;
  const difficulty = difficultySelect.options[difficultySelect.selectedIndex].text.toLowerCase();
  selectedNumberOfQuestions = parseInt(
    questionSelect.options[questionSelect.selectedIndex].text
  );

  const url = `https://opentdb.com/api.php?amount=${selectedNumberOfQuestions}&type=multiple&category=${categoryId}&difficulty=${difficulty}`
  getQuestions(url);
}

function getQuestions(url) {
  loadingWheel(true);
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => {
      if (loadedQuestions.results.length <= 0) {
        errorState.classList.remove('hidden');
      }
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: loadedQuestion.question
        };

        const answerChoices = loadedQuestion.incorrect_answers;
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
      if (question.length > 0) {
        startGame();
        loadingWheel(false);
      } else {
        displayErrors();
      }
    })
    .catch((err) => {
      console.error(err);
      displayErrors();
    })
    .finally(() => startGame());
}

/**
 * Starts the game
 */

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  home.classList.add("hidden");
};

/**
 * Gets the next question if one is available
 * else
 * it ends the game completing the users final score
 */

function getNewQuestion() {
  loadingWheel(true);
  if (availableQuestions.length == 0) {
    loading
    game.classList.add("hidden");
    end.classList.remove("hidden");
    finalScore.innerHTML = `Congratulations you scored: ${score} / ${selectedNumberOfQuestions}`;
  } else {
    questionCounter++;
    questionCounterText.innerHTML = `${questionCounter}/${selectedNumberOfQuestions}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  loadingWheel(false);
}

/**
 * Increments the score
 * @param {number} num - The number to increase it by
 */

function incrementScore(num) {
  score += num;
  scoreText.innerHTML = score;
}

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

function loadingWheel(loading) {
  if (loading) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

function displayErrors() {
  restartQuiz.addEventListener('click', () => {
    score = 0;
    scoreText.innerHTML = score;
    end.classList.add("hidden");
    startGame();
  });

  restartNew.addEventListener('click', () => {
    end.classList.add("hidden");
    home.classList.remove("hidden");
    score = 0;
    scoreText.innerHTML = score;
  })
}

getCategories();