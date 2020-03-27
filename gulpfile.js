const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function compile(done){
    gulp.src('css/scss/main.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({
        errorLogToConsole:true,
        outputStyle: 'compressed'
        }) )
    .pipe(
        autoprefixer({
            cascade: false
        })
    )
    .on( 'error', console.error.bind(console) )
    .pipe( rename({suffix: '.min'}) )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('css/') )
    done();
}

function watchSass(){
    gulp.watch('css/scss/*.scss', compile);
}

gulp.task('default', gulp.series(watchSass));
