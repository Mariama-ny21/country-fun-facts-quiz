// Function to toggle dark mode
function myToggle() {
    document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question-container");
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Start the quiz
    document.getElementById("start-quiz").addEventListener("click", function () {
        document.getElementById("quiz-container").style.display = "block";
        this.style.display = "none"; // Hide start button
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

        if (checked.hasAttribute("data-correct") && checked.getAttribute("data-correct") === "true") {
            correctAnswers++;
        } else {
            incorrectAnswers++;
            if (correctAnswerElem) correctAnswerElem.style.display = "inline"; 
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
        showAnswersBtn.style.display = "block"; // Reveal modal button at quiz end
        
        // 🎉 Trigger confetti animation when quiz ends
        showCongratulations();
    }
}
// Show congratulations message with confetti
const jsConfetti = new JSConfetti();

function showCongratulations() {
    document.getElementById("end-message").style.display = "block";
    
    // Trigger confetti animation
    jsConfetti.addConfetti({
        confettiColors: ['#0077b6', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'],
        confettiRadius: 6,
        confettiNumber: 300
    });
}

// Attach event listener to next button
document.getElementById("next-button").addEventListener("click", showNextQuestion);



    // Restart Quiz
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

        document.querySelectorAll(".feedback, .correct-answer").forEach(element => {
            element.innerHTML = "";
            element.style.display = "none";
        });

        document.getElementById("correct-score").textContent = "0";
        document.getElementById("incorrect-score").textContent = "0";
        document.getElementById("total-score").textContent = "0";

        document.getElementById("end-message").style.display = "none";
        showAnswersBtn.style.display = "none"; // Hide modal button on restart
        modal.style.display = "none"; // Ensure modal itself is hidden too
    });

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

    // Modal functionality
    const modal = document.getElementById("correct-answers-modal");
    const showAnswersBtn = document.getElementById("show-answers");
    const closeBtn = document.querySelector(".close");

    showAnswersBtn.style.display = "none"; // Initially hide modal button

    showAnswersBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
