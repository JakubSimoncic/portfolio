document.addEventListener('DOMContentLoaded', () => {
    // 1. Zprovoznění mobilního menu
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // 2. Automatické zvýraznění aktivní stránky v menu
    const currentPath = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (currentPath === "" && href === "index.html")) {
            link.classList.add('active');
        }
    });

    // 3. Chytré schovávání nav baru při výraznějším scrollu dolů
    const navBar = document.getElementById('main-nav');
    // OPRAVA REFRESHŮ: Hned při načtení načteme reálnou startovní pozici scrollu
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const tolerance = 60; // Výraznější tolerance pro plynulý pohyb (počet px)

    if (navBar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // 1. Když je uživatel blízko vršku stránky (do 150px), navigace zůstane VŽDY viditelná
            if (currentScroll <= 150) {
                navBar.style.transform = "translateY(0)";
                lastScrollTop = currentScroll; // Udržujeme aktuální pozici
                return;
            }

            // 2. Ignorujeme malé pohyby, které nedosahují limitu tolerance
            if (Math.abs(lastScrollTop - currentScroll) <= tolerance) {
                return;
            }

            // 3. Pokud scrolluje dolů a mobilní menu NENÍ otevřené -> schovat nav bar
            if (currentScroll > lastScrollTop && (!navLinks || !navLinks.classList.contains('active'))) {
                navBar.style.transform = "translateY(-100%)";
            } else {
                // Pokud scrolluje nahoru -> nav bar ihned ukázat
                navBar.style.transform = "translateY(0)";
            }

            lastScrollTop = currentScroll;
        });
    }
});
