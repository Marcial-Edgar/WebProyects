document.addEventListener("DOMContentLoaded", function () {
  scrolNav();

  navegacionFija();
});

function navegacionFija() {

    const barra = document.querySelector('.header');

    /**
     * Intersection Observer.- es una Api que funciona en 2 partes:
     * el primero es Registrar el Intersection Observer
     * el otro es el elemento observar
     */

     // Registrar el Intersection Observer 
     const observer = new IntersectionObserver( function(entries) { // entries nos va a dar la informacion del elemento a observar y se pasa automaticamente como el evento(e)
        // console.log(entries[0]);

        if(entries[0].isIntersecting) {
            // console.log('Elemento visible');
            barra.classList.remove('fijo');
        } else {
            // console.log('Ya desaparecio');
            barra.classList.add('fijo');
        }
     });

     // Elemento a observar
    //  observer.observe(document.querySelector('.sobre-festival'));
     observer.observe(document.querySelector('.contenido-video'));
}

function scrolNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  // console.log(enlaces);

  /**
     * Lo siguiente marcará de error al registrar un evento de evenListenner 
     * al dar click a un enlace queremos ejecutar un codigo javascript, sim embargo como se menciona lo siguiente marcará error: 
      
       enlaces.addEventListener('click', function() {

    });
    
    * No se puede registrar un eventListenner a un listado de varios elementos, tiene que se a un solo elemento
    */

  enlaces.forEach(function (enlace) {
    // console.log(enlace);
    //Ahora sí podemos atar el evento que tratamos de hacer en el codigo comentado arriba
    enlace.addEventListener("click", function (e) {
      e.preventDefault(); // prevenimos el evento que tiene por default

      // console.log(e.target.attributes.href.value);

      const seccion = document.querySelector(e.target.attributes.href.value); // queryselector porque estamos iterando en cada uno de los elementos
      seccion.scrollIntoView({
          behavior: 'smooth'
      }); 
      /**
       * con scrollIntoView volvemos a tener el efecto que teniamos al principio al dar click en el enlace, 
         pudieramos decir que ese es el metodo por default que tiene.
       * podemos pasarle un objeto de configuracion y de esa manera modificar el efecto, que solo tiene 2 al parecer,
         uno es el que tiene por defecto y el otro es smooth
      */ 
    });
  });
}
