// Simple test to modify a Knack button when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ GitHub JavaScript Loaded!"); // Verify script is running

    // Select all Knack buttons and change their text
    let buttons = document.querySelectorAll(".kn-button");
    
    if (buttons.length === 0) {
        console.warn("⚠️ No .kn-button elements found! Check Knack structure.");
    } else {
        buttons.forEach(button => {
            button.textContent = "GitHub Works!";
            button.style.backgroundColor = "#ff5733"; // Change button color to orange
            console.log("🎉 Button updated:", button);
        });
    }
});
