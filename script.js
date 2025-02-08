document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("scene1").classList.add("hidden");
        document.getElementById("scene2").classList.remove("hidden");

        setTimeout(() => {
            document.getElementById("scene2").classList.add("hidden");
            document.getElementById("scene3").classList.remove("hidden");
        }, 4000); // After airplane flies

    }, 3000); // After dream sequence

    // Letter Click Event
    document.getElementById("letter").addEventListener("click", function() {
        document.getElementById("photo-card").style.display = "block";
    });

    // Go Back Button
    document.getElementById("goBack").addEventListener("click", function() {
        document.getElementById("scene3").classList.add("hidden");
        document.getElementById("scene4").classList.remove("hidden");
    });
});
