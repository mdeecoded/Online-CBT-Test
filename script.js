document.addEventListener("DOMContentLoaded", function() {
    const questions = [
      {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "O2", "NaCl"],
        correctAnswer: "H2O"
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        question: "What year did the Titanic sink?",
        answers: ["1912", "1905", "1920", "1899"],
        correctAnswer: "1912"
      }
    ];
  
    const quizContainer = document.querySelector(".question-container");
    const submitButton = document.getElementById("submit-btn");
    const retakeButton = document.getElementById("retake-btn");
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
  
    let score = 0;
    let currentQuestion = 0;
    let timeLeft = 120;
    let timerInterval;
  
    function displayQuestion() {
      const question = questions[currentQuestion];
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = `
        <h2>${question.question}</h2>
        <ul>
          ${question.answers.map(answer => `
            <li>
              <input type="radio" id="${answer}" name="answer" value="${answer}">
              <label for="${answer}">${answer}</label>
            </li>`).join('')}
        </ul>
      `;
      quizContainer.innerHTML = '';
      quizContainer.appendChild(questionElement);
    }
  
    function displayScore() {
      scoreDisplay.textContent = `Your Score: ${score}/${questions.length}`;
      retakeButton.style.display = 'block';
    }
  
    function startTimer() {
      timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          submitButton.disabled = true;
          retakeButton.style.display = 'block';
          displayScore();
        }
      }, 1000);
    }
  
    function resetQuiz() {
      clearInterval(timerInterval);
      score = 0;
      currentQuestion = 0;
      timeLeft = 120;
      retakeButton.style.display = 'none';
      prevButton.disabled = true;
      nextButton.disabled = false;
      submitButton.disabled = false;
      scoreDisplay.textContent = '';
      timerDisplay.textContent = 'Time Left: 2:00';
      displayQuestion();
      startTimer();
    }
  
    function navigateToPrev() {
      currentQuestion--;
      if (currentQuestion === 0) {
        prevButton.disabled = true;
      }
      nextButton.disabled = false;
      displayQuestion();
    }
  
    function navigateToNext() {
      currentQuestion++;
      if (currentQuestion === questions.length - 1) {
        nextButton.disabled = true;
      }
      prevButton.disabled = false;
      displayQuestion();
    }
  
    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
          const selectedAnswer = selectedOption.value;
          const correctAnswer = questions[currentQuestion].correctAnswer;
          if (selectedAnswer === correctAnswer) {
            score++;
          }
          currentQuestion++; // Move to the next question regardless of the answer
          if (currentQuestion < questions.length) {
            // If there are more questions, display the next question
            displayQuestion();
          } else {
            // If all questions have been answered, display the final score
            displayScore();
          }
        }
      }
      
      
  
    submitButton.addEventListener('click', () => {
      checkAnswer();
      submitButton.disabled = true;
      retakeButton.style.display = 'block';
      displayScore();
    });
  
    retakeButton.addEventListener('click', resetQuiz);
    prevButton.addEventListener('click', navigateToPrev);
    nextButton.addEventListener('click', navigateToNext);
  
    resetQuiz();
  });
  