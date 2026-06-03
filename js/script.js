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
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Zvětšujeme toleranci na pořádný kus (80px jednoho souvislého pohybu)
    const tolerance = 80; 

    if (navBar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // 1. Ochranná zóna nahoře - do 200px odshora se nav bar nikdy neschová
            if (currentScroll <= 200) {
                navBar.style.transform = "translateY(0)";
                lastScrollTop = currentScroll;
                return;
            }

            // 2. Pokud se hýbeš v rámci tolerance, kód nic nedělá
            if (Math.abs(lastScrollTop - currentScroll) <= tolerance) {
                return;
            }

            // 3. Schování / ukázání podle jasného směru
            if (currentScroll > lastScrollTop && (!navLinks || !navLinks.classList.contains('active'))) {
                // Scrolluješ dolů -> schovat
                navBar.style.transform = "translateY(-100%)";
            } else if (currentScroll < lastScrollTop) {
                // Jakýkoliv náznak scrollu nahoru -> okamžitě ukázat
                navBar.style.transform = "translateY(0)";
            }

            // Aktualizujeme pozici až PO překročení tolerance, což vytvoří ten správný tupý/necitlivý efekt
            lastScrollTop = currentScroll;
        });
    }
});
