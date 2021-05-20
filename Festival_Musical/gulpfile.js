const { series, src, dest, watch, parallel } = require("gulp"); // la dependencia de gulp se instala con: npm i --save-dev gulp
const sass = require("gulp-sass"); // la dependencia de sass se instala con: npm install --save-dev gulp-sass
const imagemin = require("gulp-imagemin"); // la dependencia de imagemin se instala con: npm install --save-dev gulp-imagemin
const notify = require("gulp-notify"); // la dependencia de notify se instala con: npm i --save-dev gulp-notify
const webp = require("gulp-webp"); // la dependencia de webp se instala con: npm install --save-dev gulp-webp
const concat = require("gulp-concat"); // la dependencia de concat se instala con: npm i --save-dev gulp-concat

/**
 * Utilidades CSS
 * las siguientes utilidades css se descargaron con el siguiente comando:
   npm install --save-dev autoprefixer gulp-postcss gulp-sourcemaps cssnano
 * tambien se instalo postcss (mas global por asi decirlo ya que se descargo gulp-postcss y es diferente):
   npm install --save-dev postcss
 */
const autoprefixer = require('autoprefixer'); // esta dependencia nos va a permitir agregar prefijos
const postcss = require('gulp-postcss'); // esta dependencia nos agregará cierto procesamiento a nuestro css
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps');


/**
 * Utilidad JS
 * las siguientes utilidades js se descargaron con el siguiente comando:
   npm install --save-dev gulp-terser-js
 */
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*',
    js: 'src/js/**/*.js'
}

function css() {
  return src(paths.scss)
    .pipe( sourcemaps.init()) // para iniciar la funcionalidad de sourcemaps
    .pipe(
      sass(/*{
        outputStyle: "expanded",
      } esto que comentamos ya no es necesario ya que tenemos cssnano*/)
    )
    .pipe( postcss( [autoprefixer(), cssnano()])) // "digamos que vamos a transformar el css con el autoprefixer"
    .pipe( sourcemaps.write('.')) // se escribe nuestro propio mapa en nuestro disco duro
    .pipe(dest("./build/css"));
}

/* ya no es necesario porque lo hace cssnano
function minificarcss() {
  return src(paths.scss)
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(dest("./build/css"));
}
*/

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init()) // inicamos el sourcemap
        .pipe( concat('bundle.js') )
        .pipe( terser())
        .pipe( sourcemaps.write('.'))
        .pipe( rename({ suffix: '.min'}))
        .pipe( dest('./build/js') )
}

function imagenes() {
  return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Imagen Minificada" }));
}

function versionWebp() {
  return src(paths.imagenes)
  .pipe( webp() )
  .pipe( dest("./build/img"))
  .pipe( notify({ message: 'Versión webP lista'}));
}

function watchArchivos() {
  watch(paths.scss, css);
  watch(paths.js, javascript);
}

exports.css = css;
// exports.minificarcss = minificarcss; ya no es necesario la tarea porque cssnano ya lo realiza
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);
