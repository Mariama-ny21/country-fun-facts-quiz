document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question-container");
  let currentQuestionIndex = 0;

  // Ensure only the first question is visible at the start
  questions.forEach((q, index) => {
    q.style.display = index === 0 ? "block" : "none"; // Hide all except the first
  });

  // Function to show the next question
  function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      questions[currentQuestionIndex].style.display = "none"; // Hide current question
      currentQuestionIndex++; // Move to next question
      questions[currentQuestionIndex].style.display = "block"; // Show next question
    } else {
      alert("Quiz completed!");
    }
  }

  // Attach event listener to the "Next Question" button
  document.getElementById("next-button").addEventListener("click", showNextQuestion);

  // Start Quiz Button
  document.getElementById("start-quiz").addEventListener("click", function () {
    document.getElementById("quiz-container").style.display = "block"; // Show quiz
    this.style.display = "none"; // Hide start button
  });

  // Restart Quiz Button
  document.getElementById("restart-quiz").addEventListener("click", function () {
    currentQuestionIndex = 0; // Reset index
    questions.forEach((q, index) => {
      q.style.display = index === 0 ? "block" : "none"; // Show first question
    });
    document.getElementById("quiz-container").style.display = "block"; // Show quiz again
  });

  // Correct Answers in Country / City section
 
  document.querySelectorAll(".answer-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const correctAnswer = this.parentElement.querySelector(".correct-answer"); // Find correct answer inside the <li>
        if (this.checked && correctAnswer) {
            correctAnswer.style.display = "inline"; // Show correct answer
            correctAnswer.style.fontSize = "18px"; // Make it stand out
        }
    });
});

  // Reveal Answer Buttons in Fun Facts section
  document.querySelectorAll(".reveal-btn").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.previousElementSibling;
      answer.style.opacity = "1"; // Fade-in effect applied via CSS
      button.style.display = "none"; // Hide the button after revealing
    });
  });

  // Reveal Answer Buttons in Fun Facts section (Event Delegation)
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("reveal-btn")) {
      const answer = event.target.previousElementSibling;
      answer.style.display = "inline"; // Show the answer
      event.target.style.display = "none"; // Hide the button
    }
  });
});
