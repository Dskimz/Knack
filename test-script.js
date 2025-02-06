// Simple test to modify a Knack button when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("GitHub JavaScript Loaded!"); // Verify script is running

    // Change all Knack buttons to say "GitHub Works!"
    document.querySelectorAll(".kn-button").forEach(button => {
        button.textContent = "GitHub Works!";
        button.style.backgroundColor = "#ff5733"; // Change button color to orange
    });
});
