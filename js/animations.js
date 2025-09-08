document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with animation classes
    const elementsToAnimate = document.querySelectorAll('.js-animate-from-left, .js-animate-from-right, .js-animate-from-bottom');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation-active class to trigger the CSS animation
                entry.target.classList.add('animation-active');
                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        // Initially, the elements are invisible
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        // Custom transforms for specific animations
        if (element.classList.contains('js-animate-from-left')) {
            element.style.transform = 'translateX(-100px)';
        } else if (element.classList.contains('js-animate-from-right')) {
            element.style.transform = 'translateX(100px)';
        }
        
        // Add the transition property
        element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Start observing each element
        observer.observe(element);
    });
});