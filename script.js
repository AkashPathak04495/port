document.addEventListener("DOMContentLoaded", function () {
    // Your existing code
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
                // active sections for animation on scroll
                sec.classList.add('show-animate');
            }
            // if want to animation that repeats on scroll use this
            else {
                sec.classList.remove('show-animate');
            }
        });

        // sticky navbar
        let header = document.querySelector('header');

        header.classList.toggle('sticky', window.scrollY > 100);

        // remove toggle icon and navbar when click navbar links (scroll)
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');


        let footer = document.querySelector('footer');

        footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
    }

    // New code for section animation on scroll
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
            }
        });
    }

    // Initial load check
    loadSections();

    // Scroll event listener
    window.addEventListener("scroll", function () {
        loadSections();
    });
});
