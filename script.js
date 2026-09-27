/* =========================================================
   MERI NUKALA - PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================
   DOM READY
   ========================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       NAVIGATION ELEMENTS
       ========================= */

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const sections =
        document.querySelectorAll("section[id]");


    /* =========================
       ACTIVE NAVIGATION ON CLICK
       ========================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* =========================
       ACTIVE NAVIGATION ON SCROLL
       ========================= */

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =========================
       SCROLL REVEAL
       ========================= */

    const revealElements =
        document.querySelectorAll(
            ".skill-card, .project-card, .experience-card"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =========================
       TYPING EFFECT
       ========================= */

    const heroTitle =
        document.querySelector(".hero h2");


    const roles = [

        "Embedded Systems & IoT Enthusiast",

        "Embedded Developer",

        "IoT Project Builder",

        "Software Aspirant"

    ];


    if (
        heroTitle &&
        !prefersReducedMotion
    ) {

        let roleIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        const typingSpeed = 75;

        const deletingSpeed = 40;

        const pauseAfterTyping = 1800;

        const pauseAfterDeleting = 500;


        function typeRole() {

            const currentRole =
                roles[roleIndex];


            if (!deleting) {

                characterIndex++;

                heroTitle.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex ===
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );

                    return;

                }

            } else {

                characterIndex--;

                heroTitle.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex === 0
                ) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;

                    setTimeout(
                        typeRole,
                        pauseAfterDeleting
                    );

                    return;

                }

            }


            setTimeout(
                typeRole,
                deleting
                    ? deletingSpeed
                    : typingSpeed
            );

        }


        typeRole();

    }


    /* =========================
       CURRENT YEAR
       ========================= */

    const footerText =
        document.querySelector("footer p");


    if (footerText) {

        const currentYear =
            new Date().getFullYear();


        footerText.textContent =
            `© ${currentYear} Meri Nukala. All Rights Reserved.`;

    }


    /* =========================
       EXTERNAL LINK SAFETY
       ========================= */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});