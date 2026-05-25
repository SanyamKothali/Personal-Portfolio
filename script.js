/* ==========================================
   PORTFOLIO INTERACTIVE TRIGGERS & SCRIPTS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const themeBtn = document.getElementById("themeBtn");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");
    const links = document.querySelectorAll(".nav-links a");
    const revealElements = document.querySelectorAll(".reveal");
    const typingElement = document.getElementById("typingElement");

    /* ==========================
       1. Mobile Menu Toggle
       ========================== */

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");

            if (navLinks.classList.contains("show")) {
                menuBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                `;
            } else {
                menuBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                    </svg>
                `;
            }
        });

        links.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");

                menuBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                    </svg>
                `;
            });
        });
    }

    /* ==========================
       2. Dark / Light Theme
       ========================== */

    const currentTheme = localStorage.getItem("portfolio-theme") || "dark";

    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        if (sunIcon) sunIcon.style.display = "block";
        if (moonIcon) moonIcon.style.display = "none";
    } else {
        document.body.classList.remove("dark");
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "block";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("portfolio-theme", "dark");
                if (sunIcon) sunIcon.style.display = "block";
                if (moonIcon) moonIcon.style.display = "none";
            } else {
                localStorage.setItem("portfolio-theme", "light");
                if (sunIcon) sunIcon.style.display = "none";
                if (moonIcon) moonIcon.style.display = "block";
            }
        });
    }

    /* ==========================
       3. Scroll Reveal Animation
       ========================== */

    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ==========================
       4. Scroll Spy Navigation
       ========================== */

    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        let currentSection = "home";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        links.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================
       5. Typing Animation
       ========================== */

    if (typingElement) {
        const words = [
            "Junior Software Developer",
            "MERN Stack Developer",
            "Full Stack Engineer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeDelay = 120;

        function typeWriter() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeDelay = 60;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeDelay = 120;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeDelay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeDelay = 500;
            }

            setTimeout(typeWriter, typeDelay);
        }

        typeWriter();
    }

    /* ==========================
       6. EmailJS Contact Form
       ========================== */

    const contactForm = document.getElementById("contact-form");
    const sendBtn = document.getElementById("send-btn");
    const formStatus = document.getElementById("form-status");

    // Replace only this public key if EmailJS still says "Public Key is invalid"
    const EMAILJS_PUBLIC_KEY = "G5vZ7GT1rlTmogn7Z";

    // These two are from your current script.js
    const EMAILJS_SERVICE_ID = "service_sk1008";
    const EMAILJS_TEMPLATE_ID = "template_bqfhefh";

    if (contactForm && sendBtn && formStatus) {
        if (typeof emailjs === "undefined") {
            formStatus.innerText = "EmailJS CDN is missing. Add EmailJS CDN before script.js.";
            formStatus.style.color = "#ef4444";
            console.error("EmailJS is not loaded. Check index.html script order.");
            return;
        }

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            sendBtn.innerText = "Sending...";
            sendBtn.disabled = true;
            formStatus.innerText = "";

            emailjs
                .sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                )
                .then(
                    function (response) {
                        console.log("EmailJS Success:", response);

                        formStatus.innerText = "Message sent successfully!";
                        formStatus.style.color = "#22c55e";

                        contactForm.reset();
                        sendBtn.innerText = "Send Message >";
                        sendBtn.disabled = false;
                    },
                    function (error) {
                        console.error("EmailJS Error:", error);

                        formStatus.innerText =
                            "EmailJS Error: " + (error.text || JSON.stringify(error));

                        formStatus.style.color = "#ef4444";

                        sendBtn.innerText = "Send Message >";
                        sendBtn.disabled = false;
                    }
                );
        });
    }
});