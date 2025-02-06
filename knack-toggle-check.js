// Knack button to toggle field_291 from "Check" to "Neither" on scene_34

$(document).on('knack-view-render.scene_34', function(event, view) {
    $(".knack-toggle-check-btn").remove(); // Prevent duplicate buttons

    // Append a button inside the view
    let buttonHtml = '<button class="knack-toggle-check-btn" style="margin:10px; padding:10px; background:#1899D6; color:#fff; border:none; border-radius:5px; cursor:pointer;">Toggle Check</button>';
    $("#" + view.key).prepend(buttonHtml);

    $(".knack-toggle-check-btn").off("click").on("click", function() {
        let recordId = $(".kn-table tbody tr:first").attr("id"); // Gets first record's ID
        let fieldKey = "field_291"; // Knack field key

        if (!recordId) {
            alert("No record found!");
            return;
        }

        Knack.showSpinner(); // Show loading indicator

        // Fetch the current field value
        $.ajax({
            url: Knack.url(`/v1/objects/object_X/records/${recordId}`), // Replace object_X with your object ID
            type: "GET",
            headers: { "Authorization": Knack.getUserToken() },
            success: function(record) {
                let newValue = record[fieldKey] === "Check" ? "Neither" : record[fieldKey]; // Toggle value
                
                // Update only if it's "Check"
                if (record[fieldKey] === "Check") {
                    $.ajax({
                        url: Knack.url(`/v1/objects/object_X/records/${recordId}`),
                        type: "PUT",
                        headers: { "Authorization": Knack.getUserToken(), "Content-Type": "application/json" },
                        data: JSON.stringify({ [fieldKey]: newValue }),
                        success: function() {
                            Knack.hideSpinner();
                            location.reload(); // Refresh to show changes
                        }
                    });
                } else {
                    Knack.hideSpinner();
                }
            }
        });
    });
});
