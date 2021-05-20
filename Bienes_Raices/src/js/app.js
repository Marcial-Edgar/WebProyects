document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
    darkMode();
});

function eventListeners() {
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenu.addEventListener('click', navegacionResponsive);
}

function darkMode() {

    /**
     * El siguiente codigo es para leer las preferencias del sistema aunque en el video 284 solo se muestra para MAC
     * basicamente lo que hace el codigo es que si el usuario prefiere el dark mode en el sistema, entonces
       automaticamente se agregará la clase a la pagina web
     */
    const prefieraDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(prefieraDarkMode.matches);

    if(prefieraDarkMode.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    prefieraDarkMode.addEventListener('change', function() {
        if(prefieraDarkMode.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    const botonDarkMode = document.querySelector('.dark-mode-boton');

    botonDarkMode.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

function navegacionResponsive() {
    // console.log('desde navegacionResponsive');
    const navegacion = document.querySelector('.navegacion');

    // una manera de agregar y eliminar la clase mostrar al darle click
    if(navegacion.classList.contains('mostrar')) {
        navegacion.classList.remove('mostrar');
    } else {
        navegacion.classList.add('mostrar');
    }

    // otra manera de realizar el codigo de arriba
    // navegacion.classList.toggle('mostrar');
}

