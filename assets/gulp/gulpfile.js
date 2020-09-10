const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browse_sinc = require('browser-sync').create();
const minify = require('gulp-minify');

function cssStyle(done) {
    /* add ! to ignore current file*/
    gulp.src(['./scss/**/*.scss','!./scss/noCompress.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../css/'))
        .pipe(browse_sinc.stream())
    ;
    done();
}

function compress(done){

    gulp.src(['./js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(minify({
            ext:{
                src:null,
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../js/'));
    done();
}


function watchSass() {
    gulp.watch('./scss/**/*', cssStyle);
    gulp.watch('./js/**/*',compress);
}


gulp.task('default', gulp.parallel(cssStyle, watchSass, compress));
