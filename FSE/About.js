document.addEventListener("DOMContentLoaded", function() {
    const text = "The Chat PDF project is a full-stack application designed to facilitate easy communication with PDF documents. Users can upload PDFs, and the system provides an interactive chat interface that helps users extract information, summarize content, and answer queries from the document.";
    const heading = "Project Overview"
    let index = 0;
    const speed = 50; // Adjust typing speed

    function typeEffect() {
        if (index < text.length) {
            document.getElementById("description-text").innerHTML += text.charAt(index);
            document.getElementById("about-heading").innerHTML += heading.charAt(index);
            index++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();
});
