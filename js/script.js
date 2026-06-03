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
    let lastScrollTop = 0;
    const tolerance = 15; // O kolik pixelů musí uživatel popojet, aby nav bar reagoval

    if (navBar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // 1. Když je uživatel úplně nahoře, navigace zůstane stoprocentně viditelná
            if (currentScroll <= 10) {
                navBar.style.transform = "translateY(0)";
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
