const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let autoSlideTimer = null; // Timer for auto-sliding
    let isUserInteracted = false; // Track user interaction

    // Slide Images according to the slide button click
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            isUserInteracted = true; // Stop auto-slide on user interaction
            stopAutoSlide(); // Explicitly stop auto-slide
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const startAutoSlide = () => {
        if (!isUserInteracted) {
            autoSlideTimer = setInterval(() => {
                if (imageList.scrollLeft < maxScrollLeft) {
                    imageList.scrollBy({ left: imageList.clientWidth, behavior: "smooth" });
                } else {
                    clearInterval(autoSlideTimer); // Stop auto-slide when reaching the end
                }
            }, 3000); // Adjust delay between slides (in milliseconds)
        }
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    };

    const observeSlider = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoSlide(); // Start auto-slide when slider is in view
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the slider is in view

        observer.observe(document.querySelector(".slider-wrapper"));
    };

    const setupHoverListeners = () => {
        imageList.addEventListener("mouseover", () => {
            isUserInteracted = true; // Mark as interacted
            stopAutoSlide(); // Stop auto-slide on hover
        });

        imageList.addEventListener("mouseout", () => {
            if (!isUserInteracted) startAutoSlide(); // Resume auto-slide if no manual interaction
        });
    };

    imageList.addEventListener("scroll", handleSlideButtons);
    observeSlider(); // Start observing
    setupHoverListeners(); // Setup hover stop behavior
};

window.addEventListener("load", initSlider);
