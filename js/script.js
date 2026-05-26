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
        // Kontrola, zda odkaz obsahuje název souboru z cesty, nebo zda jsme na hlavní stránce
        if (currentPath === href || (currentPath === "" && href === "index.html") || (currentPath === "index.html" && href === "index.html")) {
            link.classList.add('active');
        }
    });

    // 3. Kosmetické přepsání URL (odstranění .html a přepsání indexu na home)
    const url = window.location.href;
    if (url.endsWith('index.html')) {
        const cistaUrl = url.replace('index.html', 'home');
        window.history.replaceState({}, '', cistaUrl);
    } else if (url.endsWith('.html')) {
        const cistaUrl = url.substring(0, url.length - 5); // Odřízne posledních 5 znaků (tj. ".html")
        window.history.replaceState({}, '', cistaUrl);
    }
});
