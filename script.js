"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const sections =
        document.querySelectorAll("main section[id]");

    const revealElements =
        document.querySelectorAll(".reveal");


    /* =========================
       SCROLL REVEAL
    ========================== */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }


    /* =========================
       MOBILE MENU
    ========================== */

    const closeMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

    };


    const openMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        mobileMenu.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

    };


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.contains("open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });

    }


    /* =========================
       ESCAPE KEY
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* =========================
       CLOSE MENU WHEN CLICKING
       OUTSIDE IT
    ========================== */

    document.addEventListener("click", (event) => {

        if (
            !mobileMenu ||
            !menuToggle ||
            !mobileMenu.classList.contains("open")
        ) {
            return;
        }

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeMobileMenu();

        }

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    const visibleSections =
                        entries.filter(
                            (entry) =>
                                entry.isIntersecting
                        );

                    if (!visibleSections.length) {
                        return;
                    }

                    const currentSection =
                        visibleSections.reduce(
                            (closest, entry) => {

                                if (!closest) {
                                    return entry;
                                }

                                return entry.intersectionRatio >
                                    closest.intersectionRatio
                                    ? entry
                                    : closest;

                            },
                            null
                        );


                    if (!currentSection) {
                        return;
                    }


                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                    });


                    const currentLink =
                        document.querySelector(
                            `.nav-links a[href="#${CSS.escape(
                                currentSection.target.id
                            )}"]`
                        );


                    if (currentLink) {

                        currentLink.classList.add("active");

                    }

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: [0.08, 0.2, 0.4, 0.6]
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =========================
       SMOOTH NAV CLICK
       Also immediately updates
       active state.
    ========================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });


    /* =========================
       PREVENT EMPTY "#" PROJECT
       LINK FROM JUMPING TO TOP
    ========================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    emptyLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });

});