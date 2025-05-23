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

  // Start the quiz when the button is clicked
  document.getElementById("start-quiz").addEventListener("click", function () {
    console.log("Start Quiz button clicked!"); // Debugging log
    document.getElementById("quiz-container").style.display = "block";
    this.style.display = "none"; // Hide the start button
  });

  // Ensure only the first question is visible at the start
  questions.forEach((q, index) => {
    q.style.display = index === 0 ? "block" : "none";
  });

  function checkAnswer() {
    const currentQuestion = document.querySelector(".question-container:not([style='display: none;'])");
    const checked = currentQuestion.querySelector(".answer-checkbox:checked");
    const correctAnswerElem = currentQuestion.querySelector(".correct-answer");

    if (!checked) return;

    const isCorrect = checked.hasAttribute("data-correct") && checked.getAttribute("data-correct") === "true";

    if (isCorrect) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
      if (correctAnswerElem) {
        correctAnswerElem.style.display = "inline"; // Show the correct answer only when incorrect
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
      document.getElementById("end-message").style.display = "block";
    }
  }
  document.getElementById("next-button").addEventListener("click", function () {
    console.log("Next Question button clicked!");
    showNextQuestion();
  });

  // Restart the quiz when the button is clicked
  document.getElementById("restart-quiz").addEventListener("click", function () {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    questions.forEach((q, index) => {
      q.style.display = index === 0 ? "block" : "none";
    });

    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
      checkbox.checked = false;
    });

    // Ensure feedback and correct answer elements are reset
    document.querySelectorAll(".feedback, .correct-answer").forEach(element => {
      element.innerHTML = "";
      element.style.display = "none"; // Hides correct answers on restart
    });

    document.getElementById("correct-score").textContent = "0";
    document.getElementById("incorrect-score").textContent = "0";
    document.getElementById("total-score").textContent = "0";

    document.getElementById("end-message").style.display = "none";
  });


  document.querySelectorAll(".answer-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      const parent = this.closest(".question-container");
      parent.querySelectorAll(".answer-checkbox").forEach(cb => {
        if (cb !== this) cb.checked = false;
      });

      setTimeout(checkAnswer, 100);
    });
  });

  //Fun Facts section
  document.querySelectorAll(".reveal-btn").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.previousElementSibling;
      answer.style.opacity = "1"; // Fade-in effect via CSS
      button.style.display = "none"; // Hide button after revealing
    });
  });

  // Get modal elements
  const modal = document.getElementById("correct-answers-modal");
  const showAnswersBtn = document.getElementById("show-answers");
  const closeBtn = document.querySelector(".close");

  // Initially hide the modal button
  showAnswersBtn.style.display = "none";

  // Ensure modal button is displayed only at the end of the quiz
  function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      questions[currentQuestionIndex].style.display = "none";
      currentQuestionIndex++;
      questions[currentQuestionIndex].style.display = "block";
    } else {
      document.getElementById("end-message").style.display = "block";

      // Reveal the modal button at the end
      showAnswersBtn.style.display = "block";
    }
  }

  // Show modal when button is clicked
  showAnswersBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Close modal when close button is clicked
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal if user clicks outside the modal
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});