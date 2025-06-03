// Function to toggle dark mode
function myToggle() {
    document.body.classList.toggle("darkModeToggle");
}


document.addEventListener("DOMContentLoaded", function () {
    // Instructions modal logic
    const instructionsBtn = document.getElementById("instructions-btn");
    const instructionsModal = document.getElementById("instructions-modal");
    const closeInstructions = document.getElementById("close-instructions");

    if (instructionsBtn && instructionsModal && closeInstructions) {
        instructionsBtn.addEventListener("click", function () {
            instructionsModal.style.display = "block";
        });

        closeInstructions.addEventListener("click", function () {
            instructionsModal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === instructionsModal) {
                instructionsModal.style.display = "none";
            }
        });
    }

    // Quiz logic
    const questions = document.querySelectorAll(".question-container");
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const startQuizBtn = document.getElementById("start-quiz");
    const nextButton = document.getElementById("next-button");
    const restartQuizBtn = document.getElementById("restart-quiz");
    const correctScoreElem = document.getElementById("correct-score");
    const incorrectScoreElem = document.getElementById("incorrect-score");
    const totalScoreElem = document.getElementById("total-score");
    const endMessage = document.getElementById("end-message");
    const showAnswersBtn = document.getElementById("show-answers");
    const modal = document.getElementById("correct-answers-modal");
    const closeBtn = document.querySelector(".close");

    // Hide modal button initially
    if (showAnswersBtn) showAnswersBtn.style.display = "none";

    // Start the quiz
    if (startQuizBtn) {
        startQuizBtn.addEventListener("click", function () {
            document.getElementById("quiz-container").style.display = "block";
            this.style.display = "none"; // Hide start button
        });
    }

    // Ensure only the first question is visible at the start
    questions.forEach((q, index) => {
        q.style.display = index === 0 ? "block" : "none";
    });

    function checkAnswer() {
        const currentQuestion = document.querySelector(".question-container:not([style='display: none;'])");
        if (!currentQuestion) return;
        const checked = currentQuestion.querySelector(".answer-checkbox:checked");
        const correctAnswerElem = currentQuestion.querySelector(".correct-answer");

        if (!checked) return;

        if (checked.hasAttribute("data-correct") && checked.getAttribute("data-correct") === "true") {
            correctAnswers++;
        } else {
            incorrectAnswers++;
            if (correctAnswerElem) correctAnswerElem.style.display = "inline";
        }

        if (correctScoreElem) correctScoreElem.textContent = correctAnswers;
        if (incorrectScoreElem) incorrectScoreElem.textContent = incorrectAnswers;
        if (totalScoreElem) totalScoreElem.textContent = correctAnswers;

        setTimeout(showNextQuestion, 1000);
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            questions[currentQuestionIndex].style.display = "none";
            currentQuestionIndex++;
            questions[currentQuestionIndex].style.display = "block";
        } else {
            if (endMessage) endMessage.style.display = "block";
            if (showAnswersBtn) showAnswersBtn.style.display = "block"; // Reveal modal button at quiz end
            showCongratulations();
        }
    }

    // Show congratulations message with confetti
    const jsConfetti = new JSConfetti();

    function showCongratulations() {
        if (endMessage) endMessage.style.display = "block";
        jsConfetti.addConfetti({
            confettiColors: ['#0077b6', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'],
            confettiRadius: 6,
            confettiNumber: 300
        });
    }

    // Attach event listener to next button
    if (nextButton) nextButton.addEventListener("click", showNextQuestion);

    // Restart Quiz
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener("click", function () {
            currentQuestionIndex = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;

            questions.forEach((q, index) => {
                q.style.display = index === 0 ? "block" : "none";
            });

            document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });

            document.querySelectorAll(".feedback, .correct-answer").forEach(element => {
                element.innerHTML = "";
                element.style.display = "none";
            });

            if (correctScoreElem) correctScoreElem.textContent = "0";
            if (incorrectScoreElem) incorrectScoreElem.textContent = "0";
            if (totalScoreElem) totalScoreElem.textContent = "0";

            if (endMessage) endMessage.style.display = "none";
            if (showAnswersBtn) showAnswersBtn.style.display = "none";
            if (modal) modal.style.display = "none";
        });
    }

    // Ensure only one checkbox is selected per question
    document.querySelectorAll(".answer-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const parent = this.closest(".question-container");
            parent.querySelectorAll(".answer-checkbox").forEach(cb => {
                if (cb !== this) cb.checked = false;
            });
            setTimeout(checkAnswer, 100);
        });
    });

    // Fun Facts section
    document.querySelectorAll(".reveal-btn").forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.previousElementSibling;
            answer.style.opacity = "1"; // Fade-in effect via CSS
            button.style.display = "none"; // Hide button after revealing
        });
    });

     // Modal functionality for correct answers
    const closeCorrectAnswers = document.getElementById("close-correct-answers");

    if (showAnswersBtn && modal && closeCorrectAnswers) {
        showAnswersBtn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        closeCorrectAnswers.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});