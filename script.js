document.addEventListener("DOMContentLoaded", function () {
    // Your existing code
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

    let scrollTimeout;

    window.addEventListener("scroll", function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            sections.forEach(sec => {
                let top = window.scrollY;
                let offset = sec.offsetTop - 100;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(links => {
                        links.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                    });
                    // active sections for animation on scroll
                    sec.classList.add("show-animate");
                } else {
                    sec.classList.remove("show-animate");
                }
            });

            // sticky navbar
            header.classList.toggle('sticky', window.scrollY > 100);

            // remove toggle icon and navbar when clicking navbar links (scroll)
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');

            // show-animate for footer
            footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
        }, 200); // Adjust the debounce time as needed
    });

    // New code for section animation on scroll
    let resizeTimeout;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            sections.forEach(section => {
                if (isPartiallyInViewport(section)) {
                    section.classList.add("show-animate");
                }
            });
        }, 200); // Adjust the throttle time as needed
    });

    // Initial load check
    loadSections();

    function isPartiallyInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight && rect.bottom >= 0
        );
    }

    function loadSections() {
        sections.forEach((section) => {
            if (isPartiallyInViewport(section)) {
                section.classList.add("show-animate");
            } else {
                section.classList.remove("show-animate");
            }
        });
    }
});
