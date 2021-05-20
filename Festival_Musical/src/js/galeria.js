document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`
        // console.log(imagen);
        
        //Añadir la funcion de mostrarImagen
        imagen.dataset.imagenId = i; // con esto se agrega un atributo que sería como: data-imagen-id, los stributos con data- son atributos de html5
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    // console.log('Diste click en una imagen');
    // console.log(e.target.dataset.imagenId);
    const id = parseInt(e.target.dataset.imagenId);
    // Generar la imagen
    const imagen = document.createElement('IMG'); // la constante en una funcion unicamente tiene el alcance de esa funcion, por eso aqui podemos crear la constante imagen aunque ya este repetida porque ya es otra funcion
    imagen.src = `build/img/grande/${id}.webp`;
    // console.log(imagen);

    // crear un div donde se mostrará la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    overlay.appendChild(cerrarImagen);
    //mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    // Cuando se presiona en la X, se cierra la imagen
    cerrarImagen.onclick = function() {
        overlay.remove();
    }

    // Cuando se da click en el mismo overlay, cerrar la imagen
    overlay.onclick = function() {
        overlay.remove();
    }

}