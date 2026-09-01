/* =========================================================
   SAVANNA TABLE
   Main JavaScript
   ========================================================= */

/* =========================================================
   MENU DATA
   ========================================================= */

const menuItems = [

    {
        name: "Ndolé Royale",
        category: "mains",
        price: "12,500 FCFA",
        image: "images/ndole-royale.jpeg",
        description:
            "A refined take on a Cameroonian classic with bitterleaf stew, tender prawns and roasted plantain.",
        tags: ["Chef's Choice"]
    },

    {
        name: "Grilled Sea Bass",
        category: "grill",
        price: "14,000 FCFA",
        image: "images/grilled-sea-bass.jpeg",
        description:
            "Charcoal-grilled sea bass with roasted seasonal vegetables, herb butter and cassava crisps.",
        tags: ["Chef's Choice"]
    },

    {
        name: "Jollof & Soya",
        category: "mains",
        price: "10,500 FCFA",
        image: "images/jollof-and-soya.jpeg",
        description:
            "Smoky jollof rice with spiced grilled beef soya, roasted plantain and house pepper sauce.",
        tags: ["Guest Favorite", "Spicy"]
    },

    {
        name: "Garden Harvest",
        category: "vegetarian",
        price: "9,500 FCFA",
        image: "images/vegetarian-dish.jpeg",
        description:
            "Roasted seasonal vegetables, spiced chickpeas, grilled plantain, cassava and coconut sauce.",
        tags: ["Vegetarian"]
    },

    {
        name: "Plantain Croquettes",
        category: "starters",
        price: "5,500 FCFA",
        image: "images/jollof-and-soya.jpeg",
        description:
            "Crispy plantain croquettes served with a smoky house pepper dip.",
        tags: ["Vegetarian", "Spicy"]
    },

    {
        name: "Coconut Fish Curry",
        category: "mains",
        price: "11,500 FCFA",
        image: "images/grilled-sea-bass.jpeg",
        description:
            "Tender fish simmered in aromatic coconut curry with fresh herbs and steamed rice.",
        tags: ["Chef's Choice"]
    },

    {
        name: "Charcoal Chicken",
        category: "grill",
        price: "11,000 FCFA",
        image: "images/chef-kitchen-image.jpeg",
        description:
            "Tender charcoal-grilled chicken marinated with African spices and served with house sides.",
        tags: ["Guest Favorite"]
    },

    {
        name: "Chocolate Plantain Tart",
        category: "desserts",
        price: "6,500 FCFA",
        image: "images/vegetarian-dish.jpeg",
        description:
            "Caramelized plantain, dark chocolate ganache and vanilla cream.",
        tags: []
    },

    {
        name: "Hibiscus Sunset",
        category: "drinks",
        price: "3,500 FCFA",
        image: "images/drinks1.jpeg",
        description:
            "Refreshing hibiscus infusion with citrus, mint and a touch of natural sweetness.",
        tags: ["Non-Alcoholic"]
    },

    {
        name: "Ginger Pineapple",
        category: "drinks",
        price: "3,500 FCFA",
        image: "images/drinks1.jpeg",
        description:
            "Fresh pineapple, ginger, lime and mint served over crushed ice.",
        tags: ["Non-Alcoholic"]
    }

];


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
   MENU FUNCTIONALITY
   ===================================================== */

const menuGrid =
    document.getElementById("menu-grid");

const menuSearch =
    document.getElementById("menu-search");

const menuFilters =
    document.getElementById("menu-filters");

const menuEmpty =
    document.getElementById("menu-empty");


if (
    menuGrid &&
    menuSearch &&
    menuFilters
) {

    let currentCategory = "all";


    /* ---------------------------------------------
       Render menu
       --------------------------------------------- */

    function renderMenu() {

        const searchTerm =
            menuSearch.value
                .trim()
                .toLowerCase();


        const filteredItems =
            menuItems.filter(item => {

                const matchesCategory =
                    currentCategory === "all" ||
                    item.category === currentCategory;


                const matchesSearch =
                    item.name
                        .toLowerCase()
                        .includes(searchTerm) ||

                    item.description
                        .toLowerCase()
                        .includes(searchTerm) ||

                    item.tags
                        .join(" ")
                        .toLowerCase()
                        .includes(searchTerm);


                return (
                    matchesCategory &&
                    matchesSearch
                );

            });


        menuGrid.innerHTML = "";


        if (filteredItems.length === 0) {

            menuEmpty.hidden = false;

            return;

        }


        menuEmpty.hidden = true;


        filteredItems.forEach((item, index) => {

            const article =
                document.createElement("article");

            article.className = "menu-item";

            article.style.animationDelay =
                `${index * 0.04}s`;


            const tagsHTML =
                item.tags.length
                    ? `
                        <div class="menu-item-tags">

                            ${item.tags.map(tag => `
                                <span class="menu-tag">
                                    ${tag}
                                </span>
                            `).join("")}

                        </div>
                    `
                    : "";


            article.innerHTML = `

                <div class="menu-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                </div>


                <div class="menu-item-info">

                    <div class="menu-item-top">

                        <h3>
                            ${item.name}
                        </h3>

                        <span class="menu-item-price">
                            ${item.price}
                        </span>

                    </div>


                    <p class="menu-item-description">
                        ${item.description}
                    </p>


                    ${tagsHTML}

                </div>

            `;


            menuGrid.appendChild(article);

        });

    }


    /* ---------------------------------------------
       Category buttons
       --------------------------------------------- */

    const filterButtons =
        menuFilters.querySelectorAll(
            ".filter-btn"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                });


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                renderMenu();

            }
        );

    });


    /* ---------------------------------------------
       Search
       --------------------------------------------- */

    menuSearch.addEventListener(
        "input",
        renderMenu
    );


    renderMenu();

}

    
    /* =====================================================
   FORM VALIDATION
   ===================================================== */


/* ---------------------------------------------
   Helper: show error
   --------------------------------------------- */

function showFormError(input, message) {

    const group =
        input.closest(".form-group");

    if (!group) return;

    group.classList.add("invalid");

    const error =
        group.querySelector(".form-error");

    if (error) {
        error.textContent = message;
    }

}


/* ---------------------------------------------
   Helper: clear error
   --------------------------------------------- */

function clearFormError(input) {

    const group =
        input.closest(".form-group");

    if (!group) return;

    group.classList.remove("invalid");

    const error =
        group.querySelector(".form-error");

    if (error) {
        error.textContent = "";
    }

}


/* ---------------------------------------------
   Reservation form
   --------------------------------------------- */

const reservationForm =
    document.getElementById(
        "reservation-form"
    );


if (reservationForm) {

    const dateInput =
        document.getElementById(
            "reservation-date"
        );


    /* Prevent past dates */

    if (dateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        dateInput.min = today;

    }


    reservationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "reservation-name"
                );

            const phone =
                document.getElementById(
                    "reservation-phone"
                );

            const date =
                document.getElementById(
                    "reservation-date"
                );

            const time =
                document.getElementById(
                    "reservation-time"
                );

            const guests =
                document.getElementById(
                    "reservation-guests"
                );


            const fields = [
                name,
                phone,
                date,
                time,
                guests
            ];


            let valid = true;


            fields.forEach(field => {

                clearFormError(field);


                if (!field.value.trim()) {

                    showFormError(
                        field,
                        "This field is required."
                    );

                    valid = false;

                }

            });


            if (!valid) return;


            const success =
                document.getElementById(
                    "reservation-success"
                );


            success.hidden = false;

            reservationForm.reset();

        }
    );

}


/* ---------------------------------------------
   Contact form
   --------------------------------------------- */

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contact-name"
                );

            const email =
                document.getElementById(
                    "contact-email"
                );

            const subject =
                document.getElementById(
                    "contact-subject"
                );

            const message =
                document.getElementById(
                    "contact-message"
                );


            const fields = [
                name,
                email,
                subject,
                message
            ];


            let valid = true;


            fields.forEach(field => {

                clearFormError(field);


                if (!field.value.trim()) {

                    showFormError(
                        field,
                        "This field is required."
                    );

                    valid = false;

                }

            });


            /* Email validation */

            if (
                email.value.trim() &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email.value.trim())
            ) {

                showFormError(
                    email,
                    "Please enter a valid email address."
                );

                valid = false;

            }


            if (!valid) return;


            const success =
                document.getElementById(
                    "contact-success"
                );


            success.hidden = false;

            contactForm.reset();

        }
    );

}

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu after clicking a link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.getElementById("site-header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
   SCROLL REVEAL ANIMATION
   ===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

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

        revealObserver.observe(element);

    });

}
});
