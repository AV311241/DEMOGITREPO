
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: "William Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('result-container');

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
    if (currentQuestionIndex < questions .length) {
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

loadQuestion();