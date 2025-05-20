// Function to toggle dark mode
function myToggle() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question-container");
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  // Ensure only the first question is visible at the start
  questions.forEach((q, index) => {
    q.style.display = index === 0 ? "block" : "none"; 
  });
  // Ensure the end message is hidden at the start
  function checkAnswer() {
    const currentQuestion = document.querySelector(".question-container:not([style='display: none;'])"); 
    const checked = currentQuestion.querySelector(".answer-checkbox:checked");
    const correctAnswerElem = currentQuestion.querySelector(".correct-answer"); // Keep this if displaying the correct answer

    if (!checked) return;

    const isCorrect = checked.hasAttribute("data-correct") && checked.getAttribute("data-correct") === "true";
    
    if (isCorrect) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
        if (correctAnswerElem) {
            correctAnswerElem.style.display = "inline"; // Show the correct answer when the user gets it wrong
        }
    }

    document.getElementById("correct-score").textContent = correctAnswers;
    document.getElementById("incorrect-score").textContent = incorrectAnswers;
    document.getElementById("total-score").textContent = correctAnswers;

    setTimeout(showNextQuestion, 1000);
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        questions[currentQuestionIndex].style.display = "none"; 
        currentQuestionIndex++; 
        questions[currentQuestionIndex].style.display = "block"; 
    } else {
        document.getElementById("end-message").style.display = "block"; // Show final message only at the end
    }
}

  // Ensure buttons function correctly
  document.getElementById("start-quiz").addEventListener("click", function () {
    document.getElementById("quiz-container").style.display = "block"; 
    this.style.display = "none"; 
  });

  document.getElementById("next-button").addEventListener("click", showNextQuestion);

  document.getElementById("restart-quiz").addEventListener("click", function () {
    currentQuestionIndex = 0; 
    correctAnswers = 0;
    incorrectAnswers = 0;

    questions.forEach((q, index) => {
      q.style.display = index === 0 ? "block" : "none"; 
    });

    document.getElementById("correct-score").textContent = "0";
    document.getElementById("incorrect-score").textContent = "0";
    document.getElementById("total-score").textContent = "0";

    document.getElementById("end-message").style.display = "none";
  });

  // Ensure only one checkbox is selected per question & auto-submit answer
  document.querySelectorAll(".answer-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      const parent = this.closest(".question-container"); 
      parent.querySelectorAll(".answer-checkbox").forEach(cb => {
        if (cb !== this) cb.checked = false; 
      });

      setTimeout(checkAnswer, 100);
    });
  });
});
