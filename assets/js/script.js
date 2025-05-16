
document.querySelectorAll(".reveal-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.previousElementSibling;
    answer.style.display = "inline"; // Show the answer
    setTimeout(() => {
      answer.style.opacity = "1"; // Fade in effect
    }, 10); // Slight delay for smooth transition
    button.style.display = "none"; // Hide the button
  });
});
