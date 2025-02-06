$(document).on('knack-view-render.any', function(event, view) {
    console.log("✅ Knack view rendered, adding custom text...");

    // Define the custom message
    let customMessage = "🚀 Welcome to Knack! This text is added from GitHub.";

    // Check if the message already exists (prevents duplication)
    if (document.querySelector("#custom-knack-message")) {
        console.log("ℹ️ Custom message already exists, skipping...");
        return;
    }

    // Create a new div for the message
    let messageDiv = document.createElement("div");
    messageDiv.id = "custom-knack-message";
    messageDiv.textContent = customMessage;

    // Style the message (optional)
    messageDiv.style.backgroundColor = "#1899D6"; // Light blue background
    messageDiv.style.color = "white";
    messageDiv.style.fontSize = "16px";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.padding = "10px";
    messageDiv.style.textAlign = "center";
    messageDiv.style.marginBottom = "10px";

    // Insert at the top of the page
    document.body.prepend(messageDiv);
});
