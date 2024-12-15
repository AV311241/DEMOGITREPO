// script.js
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('result-container');

// Fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch('http://10.236.10.159:1000/getAllQuestions');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions = await response.json();
        loadQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${option}" required>
                ${option}
            </label>
        `).join('')}
    `;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedAnswer = quizForm.answer.value;
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResults();
    }
});

function displayResults() {
    quizForm.style.display = 'none';
    progressBar.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Your Score: ${score} out of ${questions.length}</h2>
        <p>${score === questions.length ? 'Perfect score!' : 'Thanks for playing!'}</p>
    `;
}

// Call the fetchQuestions function to start the quiz
fetchQuestions();